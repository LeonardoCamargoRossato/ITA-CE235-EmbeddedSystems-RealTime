from pathlib import Path
from hashlib import sha256, sha1
import json, re, io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
from reportlab.graphics import renderPDF
from svglib.svglib import svg2rlg
import fitz
from PIL import Image
ROOT=Path(__file__).resolve().parents[3]
PUBLIC=ROOT/'code/public'
PDF=PUBLIC/'assets/PDF/sprint-1/us123/Relatorio_Pessoal_US123_Sprint1_Leonardo_Rossato.pdf'
PREV=PUBLIC/'assets/WebP/sprint-1/pdf'
PDF.parent.mkdir(parents=True,exist_ok=True); PREV.mkdir(parents=True,exist_ok=True)
W,H=A4; M=36; B=H-43
navy='#123653'; blue='#0B5EA7'; pale='#E7F1F9'; grey='#F4F6F8'; ink='#203343'
site='https://leonardocamargorossato.github.io/ITA-CE235-EmbeddedSystems-RealTime/'
repo='https://github.com/LeonardoCamargoRossato/ITA-CE235-EmbeddedSystems-RealTime'
app='https://leonardocamargorossato.github.io/ITA-US123-Telemetry-Decoder/'
apprepo='https://github.com/LeonardoCamargoRossato/ITA-US123-Telemetry-Decoder'
project='https://github.com/Projeto-SPRB-TR-BD/Projeto-SPRB-TR-BD'
portfolio='https://leonardocamargorossato.github.io/LCR-SolutionsArchitecture-IA-Quantum/#/'
c=canvas.Canvas(str(PDF),pagesize=A4,pageCompression=1,invariant=1)
c.setTitle('Relatório Pessoal - US123 / Sprint 1');c.setAuthor('Leonardo Camargo Rossato');c.setSubject('Relato retrospectivo elaborado em 28/11/2026')
logo=svg2rlg(str(PUBLIC/'assets/SVG/marcas/ita-logo.svg'))
def rect(x,y,w,h,color,stroke=None,r=7):
 c.setFillColor(HexColor(color));c.setStrokeColor(HexColor(stroke or color));c.roundRect(x,y,w,h,r,fill=1,stroke=1)
def text(x,y,s,size=10,bold=False,color=ink):
 c.setFillColor(HexColor(color));c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.drawString(x,y,s)
def par(x,top,s,w=W-2*M,size=10,leading=14,color=ink,bold=False):
 p=Paragraph(s,ParagraphStyle('p',fontName='Helvetica-Bold' if bold else 'Helvetica',fontSize=size,leading=leading,textColor=HexColor(color)))
 _,h=p.wrap(w,800);assert top-h>53, (s[:45],top-h);p.drawOn(c,x,top-h);return top-h
def link(x,y,label,url,size=9):
 text(x,y,label,size,True,blue);width=c.stringWidth(label,'Helvetica-Bold',size);c.setStrokeColor(HexColor(blue));c.setLineWidth(.35);c.line(x,y-1,x+width,y-1);c.linkURL(url,(x,y-2,x+width,y+size+1),relative=0)
def mark(x,y,w):
 if logo:
  c.saveState();c.translate(x,y);k=w/logo.width;c.scale(k,k);renderPDF.draw(logo,c,0,0);c.restoreState()
def page(n,kicker,title,subtitle):
 c.setFillColor(HexColor(navy));c.rect(0,H-7,W,7,fill=1,stroke=0)
 c.setFillColor(HexColor('#D3A72D'));c.rect(0,H-10,W*.58,3,fill=1,stroke=0)
 c.setFillColor(HexColor('#C55353'));c.rect(W*.58,H-10,W*.42,3,fill=1,stroke=0)
 mark(M,H-55,58);text(W-220,H-34,'CE-235  |  SPRB-TR/BD  |  US123 - Sprint 1',7,False,'#61788D')
 text(M,H-79,kicker,8,True,blue);text(M,H-104,title,20,True,navy)
 c.setStrokeColor(HexColor(blue));c.setLineWidth(2);c.line(M,H-113,W-M,H-113)
 text(M,H-137,subtitle,10,True,blue)
 c.setStrokeColor(HexColor('#D5E2EF'));c.setLineWidth(.7);c.line(M,44,W-M,44);mark(M,19,31)
 text(M+42,30,'Disciplina:',6,True);link(M+97,30,'ITA-CE235-EmbeddedSystems-RealTime',site,6)
 text(M+42,19,'Portfólio Leonardo Camargo Rossato:',6,True);link(M+175,19,'LCR-SolutionsArchitecture-IA-Quantum',portfolio,6)
 c.setFillColor(HexColor(blue));c.circle(W-M-9,26,12,fill=1,stroke=0);c.setFillColor(white);c.setFont('Helvetica-Bold',9);c.drawCentredString(W-M-9,23,str(n))
 return H-153
def sec(y,title,body):
 text(M,y,title,13,True,navy);return par(M,y-12,body)-24
def box(y,title,body,h=75):
 rect(M,y-h,W-2*M,h,pale,'#9DC6E7');text(M+13,y-19,title,10,True,navy);par(M+13,y-27,body,W-2*M-26,9.5,13);return y-h-21
def picture(path,x,top,w,maxh):
 im=Image.open(path);h=min(maxh,w*im.height/im.width);width=h*im.width/im.height
 c.drawImage(ImageReader(im),x+(w-width)/2,top-h,width,h,mask='auto');return top-h
y=page(1,'RELATO INDIVIDUAL DO ALUNO','Relatório Pessoal - US123 / Sprint 1','Ground Station API V1 - Telemetry Decoder')
rect(M,y-90,W-2*M,90,grey,'#D5E2EF')
for x,yy,label,value in [(M+13,y-18,'Aluno','Leonardo Camargo Rossato'),(M+265,y-18,'Disciplina','CE-235 - Sistemas Embarcados de Tempo Real'),(M+13,y-52,'Atividade','US123 - Sprint 1 - TS#2 / Segmento Terrestre'),(M+265,y-52,'Elaboração','28/11/2026 - relato retrospectivo')]:
 text(x,yy,label,8,True,navy);par(x,yy-8,value,242,9,12,bold=True)
y-=106
y=box(y,'Período e autoria','Atividade original: 31/08 a 25/09/2026, conforme página da Sprint 1. Documento retrospectivo elaborado em 28/11/2026. A issue individual #70 foi registrada em 25/09 (horário de Brasília; 26/09 UTC) e encerrada em 10/10/2026. Não se afirma que este PDF foi entregue em setembro.',75)
y=sec(y,'1. Síntese da contribuição','No contexto do Time Scrum 2, desenvolvi um demonstrador acadêmico de recepção, decodificação, validação e visualização de telemetria simulada, como contribuição individual vinculada à US123. O trabalho documentou a cadeia de processamento no navegador e preparou uma implementação de referência em C para integração futura. A US123 coletiva possui escopo mais amplo, incluindo estudo dos dados, armazenamento e dashboard, que não são atribuídos integralmente a esta contribuição.')
y=sec(y,'2. Objetivo','Investigar o tratamento de pacotes do segmento espacial e organizar a fronteira entre dados recebidos e telemetria validada para o segmento terrestre. O demonstrador permite inspecionar parsing, campos obrigatórios, faixas e sequência de pacotes simulados. Não constitui uma API REST completa nem comprova integração com dados reais do SCADE.')
text(M,y,'Links principais',12,True,navy)
for label,url in [('US123 coletiva - Issue #41',project+'/issues/41'),('Subsprint individual - Issue #70',project+'/issues/70'),('Repositório individual US123',apprepo),('Demonstrador funcional publicado',app),('Sprint 1 - página da disciplina',site+'#/sprint1')]:
 y-=18;link(M,y,label,url)
c.showPage()
y=page(2,'ARQUITETURA E RESULTADO TÉCNICO','Cadeia de processamento US123','Fluxo de referência publicado no portal CE-235')
y=par(M,y,'O fluxo abaixo reproduz a sequência de etapas do componente TelemetryFlow.tsx, sem alterar o diagrama aprovado no portal. A aplicação demonstra o processamento de pacotes simulados; os extremos Time 1 e Time 2 representam a fronteira lógica prevista.',size=10)-20
steps=[('TIME 1','Raw Telemetry'),('Recepção','Entrada simulada'),('JSON Parser','Interpretação JSON'),('Schema Check','Campos obrigatórios'),('Range Check','Tipos e faixas'),('Sequence Check','Duplicidade e lacunas'),('TIME 2','Validated Telemetry')]
for i,(a,b) in enumerate(steps):
 x=M+(i%2)*270;top=y-(i//2)*63
 rect(x,top-46,253,46,'#E7F1F9' if i in (0,6) else '#F4F6F8','#B8CFE2')
 text(x+10,top-17,f'{i+1:02d}  {a}',10,True,navy);text(x+10,top-33,b,9,False,ink)
 if i%2==0 and i<6:text(x+257,top-28,'>',12,True,blue)
 if i%2==1 and i<6:text(M+6,top-58,'↓'.replace('↓','v'),11,True,blue)
y-=4*63+14
y=sec(y,'Arquitetura do demonstrador','A interface React/Vite/TypeScript lê dados simulados em JSONL e utiliza módulos separados de parsing, validação e sequência. O pipeline retorna um resultado de processamento, interrompendo a validação nas falhas identificadas. A visualização permite observar os pacotes processados.')
y=box(y,'Fronteira de integração','A implementação C separa o núcleo de processamento da camada de I/O UDP (Winsock2). Trata-se de referência acadêmica para futuros imported operators, não de comprovação de integração SCADE ou transporte operacional.',65)
link(M,y,'Fluxo funcional e arquitetura na página Sprint 1',site+'#/sprint1?secao=fluxo')
c.showPage()
y=page(3,'IMPLEMENTAÇÃO E CONTRIBUIÇÃO','Implementação do demonstrador','React · Vite · TypeScript · C · GitHub Pages')
y=sec(y,'1. Dados e processamento','O README do repositório registra um conjunto de <b>180 pacotes simulados</b> em public/data/telemetry_mock.jsonl. Esse número descreve o conjunto disponível, não uma medição histórica de sucesso de 180 testes. A interface oferece inspeção dos resultados e dos dados simulados.')
y=sec(y,'2. Parsing e validação estrutural','parser.ts interpreta JSON e verifica campos obrigatórios como sat_id, seq, ts_utc, mode, pos, eps, adcs, obc e comm, incluindo campos de posição. validator.ts verifica tipo numérico finito e faixas de variáveis selecionadas. Exemplos: latitude [-90, 90], longitude [-180, 180], altitude [0, 100000] km e velocidade [0, 20] km/s.')
y=sec(y,'3. Sequência e pipeline','sequence.ts mantém estado da sequência, identifica repetição da última sequência e lacunas crescentes, contabilizando perdas. pipeline.ts encadeia parse, validate e sequence. Não se afirma cobertura de reordenação de pacotes ou todas as exceções de schema; são limitações do demonstrador.')
y=sec(y,'4. Implementação C de referência','O README_C.md descreve um core C99/C11 com buffers fixos e sem alocação dinâmica, parser específico ao schema e camada UDP isolada. A compilação Windows/MinGW é documentada como instrução de referência, não como resultado de certificação ou ensaio realizado neste relatório.')
y=box(y,'Publicação e escopo','O demonstrador foi publicado via GitHub Pages e a issue #70 registra código, processamento simulado e visualização como critérios atendidos. Nenhum ensaio de desempenho, resultado de integração real ou certificação SCADE foi inferido.',70)
link(M,y,'Código-fonte individual - módulos de telemetria',apprepo+'/tree/main/src/telemetry');link(M,y-18,'Implementação C - documentação',apprepo+'/tree/main/public/c-algorithms')
c.showPage()
y=page(4,'EVIDÊNCIAS VISUAIS','Repositório e demonstrador','Capturas reais já publicadas na documentação da Sprint 1')
for name,caption in [('github-repo-overview.png','Figura 1. Visão do repositório individual US123.'),('github-readme-overview.png','Figura 2. README da implementação e evidências da aplicação.')]:
 y=picture(PUBLIC/'assets/PNG/sprint-1/github'/name,M,y,W-2*M,245)
 text(M,y-12,caption,9,False,navy);y-=34
link(M,y,'Galeria de evidências original na página da Sprint 1',site+'#/sprint1?secao=repositorio')
link(M,y-18,'Abrir o demonstrador real publicado',app)
c.showPage()
y=page(5,'RASTREABILIDADE E EVOLUÇÃO','Evidências, limites e continuidade','Da US123 à Telemetry Processing API')
y=sec(y,'1. Evidência de entrega individual','A issue #70 vincula o autor à US123 (#41) e registra demonstrador publicado, código-fonte, processamento de dados simulados, parser e validações e página de documentação. O item de integração futura com dados reais/SCADE permanece não marcado. A issue #41 descreve o escopo coletivo; seu encerramento não comprova todos os critérios de aceite.')
y=sec(y,'2. Testes e limitações','Há registro de simulação de pacotes para testes e inspeção funcional dos resultados. Não foi localizada evidência de uma campanha formal individual com quantidade de casos aprovados, latência ou resultados de integração física no período. Não se atribuem à Sprint 1 os resultados quantitativos das Sprints posteriores.')
y=sec(y,'3. Evolução tecnológica','Ground Station API V1 é uma denominação retrospectiva do Telemetry Decoder. A V2, US221, introduziu a Telemetry Processing API local com FastAPI, contratos RAW/PROCESSED, JSONL e SQLite. A V1 permanece o primeiro estágio de processamento, não uma API REST ou plataforma remota já implantada.')
y=box(y,'Conclusão individual','A contribuição consolidou uma prova de conceito rastreável para o tratamento de telemetria simulada. O trabalho preparou a continuidade técnica da estação de solo, preservando a distinção entre evidências individuais, requisitos coletivos e integrações futuras.',65)
for label,url in [('Enunciado oficial da ListEx 3',site+'#/sprint1?secao=enunciado'),('Issue #41 - escopo coletivo',project+'/issues/41'),('Issue #70 - contribuição individual',project+'/issues/70'),('Sprint 2 - continuidade US221',site+'#/list4'),('Acervo pessoal da Sprint 1','https://drive.google.com/drive/folders/1XBxqqxhEtPH28rLyM3hbt0fQD92DiaQO')]:
 link(M,y,label,url);y-=17
c.showPage();c.save()
doc=fitz.open(PDF);assert len(doc)==5
pages=[];annotations=[]
for i,p in enumerate(doc,1):
 pix=p.get_pixmap(matrix=fitz.Matrix(1600/p.rect.width,1600/p.rect.width),alpha=False)
 filename=f'sprint1-relatorio-p{i:02}.webp';path=PREV/filename
 Image.frombytes('RGB',(pix.width,pix.height),pix.samples).save(path,'WEBP',quality=91,method=6)
 raw=path.read_bytes();rel=str(path.relative_to(PUBLIC))
 pages.append({'key':'sprint1-relatorio','path':rel,'sha':sha1(b'blob '+str(len(raw)).encode()+bytes([0])+raw).hexdigest(),'sha256':sha256(raw).hexdigest(),'width':pix.width,'height':pix.height,'bytes':len(raw)})
 annotations.append([{'rect':[l['from'].x0/p.rect.width,l['from'].y0/p.rect.height,l['from'].width/p.rect.width,l['from'].height/p.rect.height],'href':l['uri'],'label':p.get_textbox(l['from']).strip() or 'Abrir referência'} for l in p.get_links() if l.get('uri')])
 assert 'Leonardo Camargo Rossato' in p.get_text()
manifest=ROOT/'documentation/pdf-previews/manifest.json'
m=json.loads(manifest.read_text());m['documents']=[d for d in m['documents'] if d['key']!='sprint1-relatorio']
m['documents'].append({'key':'sprint1-relatorio','source':str(PDF.relative_to(ROOT)),'sourceSha256':sha256(PDF.read_bytes()).hexdigest(),'pages':pages,'retrospectiveDate':'2026-11-28'})
manifest.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
catalog=ROOT/'code/src/data/pdfPreviews.ts';s=catalog.read_text()
s=re.sub(r'  "sprint1-relatorio": \[.*?\n\s*\]\s*,\n','',s,flags=re.S)
s=s.replace('export const pdfPreviews = {','export const pdfPreviews = {\n  "sprint1-relatorio": '+json.dumps([{k:p[k] for k in ('path','width','height')} for p in pages],indent=4)+' ,\n',1)
catalog.write_text(s)
(ROOT/'code/src/data/us123Report.ts').write_text('import type {PdfPageLink} from "../components/viewers/PdfPageReader";\nexport const us123Report = {path:'+json.dumps(str(PDF.relative_to(PUBLIC)))+',fileName:'+json.dumps(PDF.name)+',sha256:'+json.dumps(sha256(PDF.read_bytes()).hexdigest())+',pageLinks:'+json.dumps(annotations,ensure_ascii=False)+' as PdfPageLink[][]};\n')
print('PDF',PDF.name,'pages',len(doc),'links',sum(map(len,annotations)),'sha256',sha256(PDF.read_bytes()).hexdigest())
