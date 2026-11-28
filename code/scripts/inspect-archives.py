"""Read-only historical ZIP metadata checks. Never extract or print sensitive values."""
from pathlib import Path
from collections import Counter
import zipfile, json, re
from hashlib import sha256

root=Path("../documentation/public/archives")
out=[]
for p in sorted(root.glob("*.zip")):
    with zipfile.ZipFile(p) as z:
        names=[x for x in z.infolist() if not x.is_dir()]
        suffixes=Counter(Path(x.filename).suffix.lower() or "(no extension)" for x in names)
        suspect=[]
        for x in names:
            n=x.filename.replace("\\","/")
            basename=n.rsplit("/",1)[-1].lower()
            if (basename==".env" or (basename.startswith(".env.") and not basename.endswith((".example",".sample",".template"))) or re.search(r"(credential|secret|password|id_rsa|id_ed25519|private.?key)",basename,re.I) or basename.endswith((".pem",".p12",".key",".pfx"))):
                suspect.append({"path":n,"reason":"potentially sensitive filename; content not printed"})
        out.append({"archive":p.name,"sha256":sha256(p.read_bytes()).hexdigest(),"entries":len(names),"uncompressed_bytes":sum(x.file_size for x in names),"formats":dict(suffixes),"possible_sensitive_paths":suspect,"git_metadata_entries":sum("/.git/" in "/"+x.filename for x in names),"node_modules_entries":sum("/node_modules/" in "/"+x.filename for x in names),"unsafe_paths":sum(x.filename.startswith("/") or ".." in Path(x.filename).parts for x in names),"note":"Filename and metadata check only; historical backups preserved."})
Path("qa-portal").mkdir(exist_ok=True)
Path("qa-portal/archives-audit.json").write_text(json.dumps(out,indent=2,ensure_ascii=False))
print("Read-only ZIP inventory:",len(out),"archives.")
