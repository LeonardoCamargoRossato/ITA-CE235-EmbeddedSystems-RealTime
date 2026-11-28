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

# Reviewed Drive PNG originals + reference pages from the authorized Lab 3 report.
image_sources=json.loads((ROOT/'documentation/labs-availability/source-images.json').read_text())
galleries={};image_inventory=[]
for d in image_sources:
 p=ROOT/d['path'];raw=p.read_bytes();assert len(raw)==d['bytes']
 src=d['path'].removeprefix('code/public/')
 rel=src.replace('/PNG/','/WebP/').removesuffix('.png')+'.webp'
 out=ROOT/'code/public'/rel;out.parent.mkdir(parents=True,exist_ok=True)
 im=Image.open(p).convert('RGB');im.thumbnail((1600,1600));im.save(out,'WEBP',quality=92,method=6)
 galleries.setdefault(d['folder'],[]).append(dict(src=rel,fullSrc=src,alt=d['caption'],caption=d['caption']))
 image_inventory.append(dict(**d,sha256=hashlib.sha256(raw).hexdigest(),webp=rel,webpSha256=hashlib.sha256(out.read_bytes()).hexdigest()))
source=next(d for d in sources if d['key']=='lab3-relatorio');doc=fitz.open(ROOT/source['path'])
for folder,page,team in [('1_-kE0v3LOyjVWtBOHU5gc-soH-xi7_N4',3,'Project 1'),('1Qmd4Owbn12u17GEXMEVgO38Y7dR4fmZz',4,'Project 2')]:
 p=doc[page-1];pix=p.get_pixmap(matrix=fitz.Matrix(1600/p.rect.width,1600/p.rect.width),alpha=False)
 im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
 rel=f'assets/PNG/list-2/lab-3/evidence/{team.lower().replace(" ","-")}-report-p{page}.png';full=ROOT/'code/public'/rel;full.parent.mkdir(parents=True,exist_ok=True);im.save(full)
 webp=rel.replace('/PNG/','/WebP/').removesuffix('.png')+'.webp';out=ROOT/'code/public'/webp;out.parent.mkdir(parents=True,exist_ok=True);im.save(out,'WEBP',quality=92,method=6)
 caption=f'{team} — evidência do relatório individual, página {page}'
 galleries[folder]=[dict(src=webp,fullSrc=rel,alt=caption,caption=caption)]
 image_inventory.append(dict(folder=folder,source=source['id'],page=page,path='code/public/'+rel,sha256=hashlib.sha256(full.read_bytes()).hexdigest(),webp=webp,webpSha256=hashlib.sha256(out.read_bytes()).hexdigest()))
(ROOT/'code/src/data/labEvidence.ts').write_text('type Item={src:string;fullSrc:string;alt:string;caption:string};\nconst relative:Record<string,Item[]>='+json.dumps(galleries,ensure_ascii=False,indent=2)+';\nexport const labEvidence=Object.fromEntries(Object.entries(relative).map(([id,items])=>[id,items.map(i=>({...i,src:import.meta.env.BASE_URL+i.src,fullSrc:import.meta.env.BASE_URL+i.fullSrc}))]));\n')
(ROOT/'documentation/labs-availability/evidence.json').write_text(json.dumps(image_inventory,ensure_ascii=False,indent=2)+'\n')
