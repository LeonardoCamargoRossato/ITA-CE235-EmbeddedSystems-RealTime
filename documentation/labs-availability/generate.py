from pathlib import Path
import json, hashlib, re
import fitz
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
sources=json.loads((ROOT/'documentation/labs-availability/source-pdfs.json').read_text())
catalog={}; docs={}; inventory=[]
for d in sources:
 p=ROOT/d['path']; raw=p.read_bytes(); assert hashlib.sha256(raw).hexdigest()==d['sha256']
 doc=fitz.open(p); assert len(doc)==d['pages']
 pages=[]; links=[]
 for i,page in enumerate(doc,1):
  pix=page.get_pixmap(matrix=fitz.Matrix(1600/page.rect.width,1600/page.rect.width),alpha=False)
  rel=f"assets/WebP/{d['dir']}/pdf/{d['key']}-p{i:02}-{d['sha256'][:8]}.webp"
  out=ROOT/'code/public'/rel;out.parent.mkdir(parents=True,exist_ok=True)
  Image.frombytes('RGB',(pix.width,pix.height),pix.samples).save(out,'WEBP',quality=91,method=6)
  b=out.read_bytes(); pages.append(dict(path=rel,width=pix.width,height=pix.height,sha256=hashlib.sha256(b).hexdigest(),bytes=len(b)))
  ann=[]
  for l in page.get_links():
   r=l['from'];a=dict(rect=[r.x0/page.rect.width,r.y0/page.rect.height,r.width/page.rect.width,r.height/page.rect.height],label=page.get_textbox(r).strip() or 'Referência')
   if l.get('uri','').startswith(('https://','http://','mailto:')):a['href']=l['uri']
   elif l.get('kind')==fitz.LINK_GOTO and l.get('page',-1)>=0:a['page']=l['page']+1
   else:continue
   ann.append(a)
  links.append(ann)
 catalog[d['key']]=[{k:p[k] for k in ('path','width','height')} for p in pages]
 docs[d['id']]=dict(key=d['key'],path=d['path'].removeprefix('code/public/'),pageLinks=links)
 inventory.append(dict(**d,generated='2026-11-28',previews=pages,annotations=sum(map(len,links))))
(ROOT/'code/src/data/labPdfPreviews.ts').write_text('export const labPdfPreviews = '+json.dumps(catalog,ensure_ascii=False,indent=2)+' as const;\n')
(ROOT/'code/src/data/labDocuments.ts').write_text('import type {PdfPageLink} from "../components/viewers/PdfPageReader";\nimport type {PdfPreviewKey} from "./pdfPreviews";\nexport const labDocuments: Record<string,{key:PdfPreviewKey;path:string;pageLinks:PdfPageLink[][]}> = '+json.dumps(docs,ensure_ascii=False,indent=2)+';\n')
(ROOT/'documentation/labs-availability/previews.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+'\n')
print('Verified',len(sources),'originals;',sum(d['pages'] for d in sources),'pages rendered')
