
export type Resource = {title:string;description:string;kind:string;href:string;date?:string};
export type Story = {id:string;title:string;status:string;description:string;source?:Resource};
export type Meeting = {date:string;summary:string;details:string;resources:Resource[]};
export type Team = {id:string;sprint:2|3;number:1|2|3;name:string;segment:string;period:string;back:string;intro:string;context:{title:string;text:string}[];stories:Story[];results:{title:string;text:string;source?:Resource}[];limitations:string[];meetings:Meeting[];groups:{title:string;resources:Resource[]}[]};
const repo="https://github.com/Projeto-SPRB-TR-BD/Projeto-SPRB-TR-BD";
const org="https://github.com/Projeto-SPRB-TR-BD";
const drive=(id:string)=>"https://drive.google.com/open?id="+id;
const folder=(id:string)=>"https://drive.google.com/drive/folders/"+id;
const sheet=(id:string)=>"https://docs.google.com/spreadsheets/d/"+id+"/edit";
const file=(id:string)=>"https://drive.google.com/file/d/"+id+"/view";
const ref=(title:string,description:string,kind:string,href:string,date?:string):Resource=>({title,description,kind,href,date});
const doc=(title:string,id:string,description:string,kind="Documento",date?:string)=>ref(title,description,kind,drive(id),date);
const dir=(title:string,id:string,description:string)=>ref(title,description,"Pasta",folder(id));
const issue=(n:number,title="Issue #"+n)=>ref(title,"Atividade oficial; status e critérios na fonte original.","GitHub",repo+"/issues/"+n);
const md=(title:string,path:string,description:string)=>ref(title,description,"GitHub · Markdown",repo+"/blob/main/"+path);
const ata=(id:string,date:string)=>doc("Ata",id,"Registro oficial da reunião.","DOCX",date);
const transcript=(id:string,date:string)=>ref("Transcrição PDF","Anotações automáticas do Gemini; conferir com a ata.","PDF",file(id),date);
const video=(id:string,date:string)=>ref("Gravação","Vídeo original da reunião; sujeito às permissões da fonte.","Vídeo",file(id),date);
const common=[
 ref("Portal acadêmico 2026/2","Contexto institucional do projeto.","Site","https://sites.google.com/view/projeto-sprb-trbd/home"),
 dir("Drive coletivo","1Gf_Hp4CZFhhk_zP-RPPmDpy95ADVrm4h","Acervo geral do projeto."),
 ref("Repositório oficial","Código, issues e documentação compartilhada.","GitHub",repo),
 ref("Product Backlog","Catálogo geral do projeto.","Planilha",sheet("1K93N5q_TlgnAUm23sRNMjGmz_aA8HK7LwbotBVx7zRc")),
 ref("Sprint Backlog geral","Referência geral de planejamento.","Planilha",sheet("1CwACilRNRjnWczQpybCekbGZsW6HSW3dtOJwfl6xwmo")),
 dir("Modelos e artefatos","1g9WjtycDhYPBd-cq3vAW2AQ7PeQqJnqd","Modelos de trabalho; não equivalem a entregas."),
 dir("Acervo coletivo da Sprint 1","1u3rqjNsl0NIObHoDwll1sG_Ee46CBYJI","Antecedentes do projeto.")
];
const sprint2Common=[
 dir("Drive coletivo da Sprint 2","1Xn_52lNzouXW5x7GqKf266ggPa2CHLxc","Materiais dos dois times."),
 doc("Burndown Chart — Sprint 2","1wfwAdEeZtulNbvlTuH328APFRMMYKhB3","Gráfico de acompanhamento; valores não reproduzidos.","Planilha")
];
const t1slides=doc("Apresentação da Sprint 2 — TS1","1tKK5XrWZBkm70WDp-UI3COQK95MA12ll","Objetivos, US210–216 e limites das alternativas técnicas.","PPTX");
const t1report=doc("Relatório sintético — TS1","1rUpQJBn0C_fAaoG1OCvYG-OhihlX38_b","Relatório de 25/10; inclui referências herdadas da Sprint 1 (US110–116).","DOC","25/10/2026");
const t2report=doc("Relatório sintético — TS2","1T5tv8eG0EIrx5544cmp92W-hLBJs0Ent","Resultados e tarefas, incluindo limitações da licença SCADE.","DOCX");
const t2slides=doc("Apresentação da Sprint 2 — TS2","1Pa7gjhk2OIeGUTmFbwn-EDltmah67TpE","Escopo, evidências e revisão da Sprint.","PPTX");
const contract=md("US221 — arquitetura e contrato C","ts2/docs/user-stories/US221_Arquitetura_Contrato_C_API.md","Especificação técnica versionada da T1, não homologação da API SCADE.");
const tc330=md("Campanha coletiva TC022 / TC024","ts2/testes/us330-tcs/resultado_ultima_execucao.md","Execução registrada em 24/11; ambiente e protocolo descritos na evidência.");
const tc331=md("Validação US331 T5","ts2/testes/us331-tcs/resultado_us331_t5_validacao_banco_unificado.md","Validação técnica do banco unificado de 19/11.");
const tc332=md("TC027 — integração de telecomando","ts2/testes/us332-tc027/resultado_ultima_execucao.md","Execução real em 24/11; escopo de teste documentado.");
const tc333=md("TC032 — idempotência de ingestão","ts2/testes/us333-tcs/resultado_ultima_execucao.md","Execução de 19/11 com achados de código/migração.");
const tc334=md("TC034 — consolidação","compartilhado/integracao/us334/evidence/consolidacao_tc034.md","Revisão da captura de 24/11 e smoke de 25/11.");
const tc335=md("TC037–039 — validação local","ts2/testes/us335-tcs/resultado_ultima_execucao.md","Verificação local, homologação cloud bloqueada.");
const meeting=(date:string,summary:string,details:string,resources:Resource[]):Meeting=>({date,summary,details,resources});
const story=(id:string,title:string,status:string,description:string,n?:number):Story=>({id,title,status,description,source:n?issue(n):undefined});
export const sprintContexts:Record<string,Team>={
time1:{
 id:"time1",sprint:2,number:1,name:"Time Scrum 1",segment:"Componentes de SW e HW do Segmento de Satélites (Espacial)",period:"28/09/2026 a 30/10/2026",back:"/list4",
 intro:"O segmento espacial prepara a origem e o envio da telemetria, a lógica de bordo e a representação orbital da constelação acadêmica de cinco satélites. Na Sprint 2, a meta era integrar telemetria do KSP, controle em malha fechada e downlink determinístico.",
 context:[
 {title:"Antecedentes — Sprint 1",text:"US110–116 são atividades herdadas, não novas USs da Sprint 2: missão orbital (NASA GMAT, MATLAB, KSP e STK previsto), máquinas de estado Standby/Operacional/Emergência, SCADE Suite e Display, HMI ARINC 661, mock UDP Python e protótipo web 2D de cinco satélites. O relatório TS1 de 25/10 registra esse histórico."},
 {title:"Objetivos e arquitetura",text:"US210–216: troca da fonte mock pela telemetria KSP/kRPC via ICD, lógica de controle, serialização C e telecomandos, com testes e documentação. O ICD de telemetria é o contrato de comunicação com o segmento terrestre."},
 {title:"Alternativas ao SCADE",text:"A apresentação registra MATLAB/Simulink, Stateflow, Simulink Coder, Embedded Coder, Design Verifier e Python/Tk. Uma planta sintética foi usada para demonstrar controle local; STK temporário era uma possibilidade em avaliação."}
 ],
 stories:[
 story("US210","Hot-swap KSP e controle em malha fechada","Issue fechada","Ensaio de comando e desligamento com ICD/UDP e Simulink/C em planta sintética; não comprova voo KSP.",79),
 story("US211","Telemetria KSP no SCADE","Issue aberta","Tarefas de preparação KSP/kRPC, publicação ICD e troca de fonte registradas como fechadas (#92, #85, #93); validação ponta a ponta ainda exigida.",80),
 story("US212","Serialização de downlink em C","Issue aberta","Contrato de downlink com ID, timestamp e CRC32; vetor e testes Python/C, tarefas #94 e #86 fechadas.",81),
 story("US213","Execução de comandos no satélite","Issue aberta","Temporizador e autorização ensaiados em planta sintética; validação de manobra KSP não comprovada.",82),
 story("US214","Verificação formal de segurança","Issue aberta","Propriedades selecionadas do controlador analisadas; Design Verifier no SCADE permanece com pendência (#89).",83),
 story("US215","Casos de teste","Planejamento / evidências","Mínimo de três casos por US funcional; incluir positivos, negativos e limites."),
 story("US216","Documentação e entregáveis","Documentação localizada","Relatório, apresentação, vídeo de revisão e artefatos de qualidade.")
 ],
 results:[
 {title:"Ensaio local de controle",text:"Integração de telemetria, interface e controlador Simulink/C com planta sintética; evidências de queima autorizada e desligamento por temporizador.",source:t1slides},
 {title:"Downlink e segurança",text:"Vetor de referência e testes de serialização/corrupção; cinco objetivos válidos no caso vetorial fixo do Design Verifier, sem prova formal de todo o sistema.",source:t1slides},
 {title:"Fundação orbital e HMI",text:"O relatório coletivo documenta visualização orbital, mock UDP e protótipo web da US113; são antecedentes da Sprint 1.",source:t1report}
 ],
 limitations:["A licença SCADE não renovada foi registrada em 20/10. SCADE Student, STK temporário e a algoritmização foram alternativas discutidas.","A integração completa KSP/kRPC, parâmetros da missão e aceite das alternativas não estão comprovados pelas fontes consultadas.","O relatório coletivo de outubro mistura IDs US110–116 com o contexto da Sprint 2; o backlog e a apresentação identificam US210–216.","O número do Kanban próprio TS1 Sprint 2 não pôde ser confirmado. A organização e o artefato oficial são fornecidos, sem inventar um quadro."],
 meetings:[
 meeting("06/10/2026","Planejamento da Sprint 2 e revisão de pendências da Sprint 1.","A ata lista US110–114 pendentes, propõe alocação, critérios de aceite, dependências, estimativas por Planning Poker e atualização do quadro. O cabeçalho menciona Sprint 1, mas a pauta é de transição.",[ata("1luO90yBprbdV0fL2ODXsxp6gU4fNNMRM","06/10/2026")]),
 meeting("13/10/2026","Alocação de tarefas e atualização do backlog.","Ata e anotações Gemini registram revisão da Sprint 1, organização do Kanban, avanço de US212, documentação US216 e avaliação de STK; os resultados ainda dependiam da execução.",[ata("1vKkPU8XcmEE6V3seUcRa7_8Zc4om3Hyh","13/10/2026"),transcript("1PGtIoyDfAdQ5beyzH2RDwCkIfpDg6Zf4","13/10/2026"),video("1XyJNCBw85fx8Yd1FSyaN3P_MYrqIuC8S","13/10/2026")]),
 meeting("20/10/2026","Impedimento de licença e planos de auditoria/testes.","Avaliar SCADE Student, solicitar STK temporário e prosseguir com modelos alternativos. Atualizar Kanban/Burndown e desenvolver ListEx 4a (CE-230) e 4b (CE-237).",[ata("1mK0i_UPJ1phIK_DRzcQ-yoN9tL36Malo","20/10/2026")])
 ],
 groups:[
 {title:"Gestão, backlog e testes",resources:[ref("Kanban — organização oficial","O artefato TS1 remete à organização; o quadro específico da Sprint 2 não foi reconfirmado.","GitHub",org),doc("Artefato 12 — Kanban","1SViyFOl5mdXDyCqSBOkq5Gw7wWf7xdHMlKA_CWvyrOk","Referência oficial à organização GitHub.","Documento"),ref("Issues TS1 · Sprint 2","Consulta filtrada pelos identificadores do time; alternativa ao quadro não confirmado.","GitHub",repo+"/issues?q="+encodeURIComponent("is:issue [TS01][S2]")),ref("Product Backlog TS1","Artefato de planejamento.","Planilha",sheet("1aae-JIw7divzNAkV3Mc_i7Eanyp3p7nOiQxu6m87pbU")),doc("Backlog completo","1QuqlTNP8xHuHknUs8Le01FA_KC5Qh9NH","Planilha lida para conferir US210–216 e US220–222.","XLSM"),doc("Burndown Chart — TS1","1R_1jEXUHVXq9-os3QfkRbJPUaV1ajby1","Arquivo listado; leitura retornou 403.","Planilha"),doc("ListEx 4a — plano de auditoria","1C5vzngwOQBR8-bWK4-LNMNAMj4vAjkU1","Artefato CE-230, não enunciado CE-235.","PDF"),doc("ListEx 4b — plano de testes","1mi5su2joOqyrpHO8zhiLwR1GxVIAKGTt","Artefato CE-237, não enunciado CE-235.","PDF")]},
 {title:"Relatórios e entregáveis",resources:[t1report,t1slides,ref("Vídeo de revisão com legendas","Revisão da Sprint 2, três minutos.","Vídeo",file("1WF-tdC58XDOmk4oVVZlmosx3y-gUHEOw")),dir("Entregáveis","1NW7oljsiMPQliSPvSic72POcArD9K0hn","Relatório, slides e vídeos."),dir("Vídeos","1SzpnROzi9e8il_qovbu8Vlen2L75HF7K","Produções do time.")]},
 {title:"Acervo oficial",resources:[dir("Pasta principal TS1","1Xv-Ob53Aw9O-GXFBhs2aDb3sG4H7Ts6f","Pasta da Sprint 2."),dir("Atas","14o2i4LIRPn6J6xsvOQnScKxp7j5fH1Jj","Registros semanais."),dir("Gravações","1vC4SgER58Ty31Dyz9nryVIq8hjMxenv6","Gravações disponíveis."),dir("Transcrições","1ULkMZk8xhTzXsWmzfoiXxL9aQO6iqkLx","Anotações automáticas."),dir("Documentos e artefatos","1FV2UzqiYR2waaDthEEXeZUZfy53raLco","Artefatos de gestão e engenharia."),...sprint2Common,...common]}
 ]
},
time2:{
 id:"time2",sprint:2,number:2,name:"Time Scrum 2",segment:"Componentes de SW e HW do Segmento de Usuários (Solo)",period:"28/09/2026 a 30/10/2026",back:"/list4",
 intro:"O segmento terrestre recebe, interpreta e valida dados de telemetria, apresenta o estado da constelação e prepara o envio de telecomandos. A Sprint 2 evoluiu a HMI, iniciou o contrato da API e preparou a integração com o legado.",
 context:[
 {title:"HMI e recepção",text:"US220: painéis de constelação, intensidade de sinal e trajetória; devido à licença SCADE, houve solução preliminar em Python/Flask, com renderização desacoplada e perfilamento de memória."},
 {title:"API e dados",text:"US221: Leonardo desenvolveu a especificação dos contratos e tipos da T1 (#107), evoluindo a US123 em React/Vite, FastAPI, RAW JSONL, PROCESSED SQLite e fronteira C. Outros integrantes trabalharam em comunicação síncrona/assíncrona, resiliência e benchmark. Não equivale à API C final do SCADE."},
 {title:"Telecomandos e infraestrutura",text:"US222: seleção entre cinco satélites, painéis de comandos, validação de pacotes, confirmação ACK e benchmark de propagação. A ata de 29/10 registra preparação da VPS/Raspberry por Cirineu e planejamento de hospedar o sistema individual na Sprint 3."}
 ],
 stories:[
 story("US220","Evolução da HMI Geral da Ground Station","Implementação preliminar","T1 modelagem visual (#102); T2 renderização e memória (#106). Relatório descreve alternativa Python/Flask; não certifica a HMI SCADE.",102),
 story("US221","API do SCADE e integração com projeto legado","Entrega parcial","T1 contrato C/JSON (#107); T2 integração SCADE (#108), T3 resiliência (#109), T4 benchmark (#110). Relatório registra dependência de licença e T4 parcial.",107),
 story("US222","Seleção e telecomando da constelação","Implementação parcial","T1 seleção (#111), T2 painéis (#112), T3 ACK (#113), T4 propagação/benchmark (#114). A conclusão do indicador visual ACK ficou condicionada ao SCADE.",111)
 ],
 results:[
 {title:"HMI alternativa",text:"O relatório coletivo registra display Python e Flask, atualização contínua e separação da renderização da cadência do backend.",source:t2report},
 {title:"Contrato técnico US221",text:"Contrato C/C++ com assinaturas, tipos, alinhamento e packing; documentação versionada de Leonardo. API local FastAPI e fronteira C são evidências individuais, não a implementação coletiva integral.",source:contract},
 {title:"Benchmark e telecomandos",text:"Revisão bibliográfica e benchmark do wrapper C na T4; não comprova latência final inferior a 1 ms. Alternativa C++/backend ao ACK documentada na ata de 29/10.",source:t2report},
 {title:"Casos de teste",text:"Planilha especifica TC013–021; várias linhas Not Run. Na consulta de issues em 27/11, TC015, TC016 e TC021 fechadas; status do issue não implica execução ou aprovação global.",source:doc("Catálogo de casos de teste","1TR_h7TITN3NnNEOJqJBZ_xhfzmADgvpr","Especificações e resultados originais.","XLSX")}
 ],
 limitations:["Licença SCADE indisponível durante a Sprint 2, prejudicando T2 e T4 da US221 e indicador visual ACK da US222.","Critérios de latência e renderização são requisitos, não medições generalizáveis; a API final integrada ao SCADE não foi demonstrada.","O registro de 10/10 nomeia Sprint 1, mas seu conteúdo descreve reunião inicial da Sprint 2 e fechamento das pendências anteriores.","O link Kanban TS2 #4 está no site já aprovado; acesso direto ao quadro não foi reconfirmado por esta sessão."],
 meetings:[
 meeting("08/10/2026","Revisão de pendências e planejamento.","Ata menciona Sprint 1, organização de entregáveis e identificação de travas no backlog; transição para a Sprint 2.",[ata("1J_ogOoOj2uYE3YzjrEAz8z7N7M72tDfq","08/10/2026"),video("1vTEgv5985VzH8eDzeCxsC_wpEqiF-Edi","08/10/2026")]),
 meeting("10/10/2026","Alinhamento de requisitos da nova Sprint.","Registro adicional com nome Sprint 1; o texto o identifica como reunião inicial da Sprint 2, com revisão das pendências herdadas e planejamento dos backlogs.",[ata("1wLRfE4eRCSp8bMTxCpOoA2h0012ey78A","10/10/2026"),video("1Yw55VaYEky_a4DPyCPww4dffdhID2RJW","10/10/2026")]),
 meeting("15/10/2026","Sprint Backlog, DoR, DoD e critérios de aceitação.","Foram registradas dependências de US222 e da T2 da US221 para a otimização T4; progresso ainda em execução.",[ata("1HHVGkhxQ34qpHlE2wfAF1cZ6035t-NSh","15/10/2026")]),
 meeting("19/10/2026","Acompanhamento das tarefas e dependências.","A ata mantém a dependência T2 → T4 da US221 e necessidade de avaliar as atividades já realizadas.",[ata("1nbege5EoMrtwGYmDBVKkUj4AxuNe0FIq","19/10/2026")]),
 meeting("22/10/2026","Licença SCADE e risco de atraso.","T3 da US222 dependia de operadores SCADE para ACK; T4 em C++ era independente. T4 US221 dependia da conclusão da T2.",[ata("1wjIriWBO2VMOYmtZdLlAde1OYVAYEFM1","22/10/2026")]),
 meeting("29/10/2026","Fechamento de entregáveis e transição para Raspberry.","Relato registra T1 US220/222, solução alternativa para ACK, benchmark parcial US221 e preparação de integração na estação de solo. A hospedagem do sistema de Leonardo era prevista para a Sprint 3.",[ata("1x2xCWRmKXC1h5W8bfbH1r5TE8C1kJFpe","29/10/2026")])
 ],
 groups:[
 {title:"Gestão, backlog e testes",resources:[ref("Kanban TS2 — Sprint 2","Quadro #4 referenciado na página aprovada; acesso ao quadro não reconfirmado.","GitHub",org+"/projects/4/views/1"),ref("Issues TS2 · Sprint 2","Consulta pelos identificadores do time.","GitHub",repo+"/issues?q="+encodeURIComponent("is:issue [TS02][S2]")),doc("Sprint Backlog TS2","1Rh-AKIzylYlZg53SaKhXDbGVtxMAu1UR","US220, US221 e US222; critérios de aceite.","XLSX"),doc("Casos de teste","1TR_h7TITN3NnNEOJqJBZ_xhfzmADgvpr","TC013–021, especificação e status.","XLSX"),doc("Plano de auditoria","1DYU_x-pS2Fv42Yu-tD4132s_WF8DCezN","ListEx 4a, CE-230.","PDF"),doc("Plano de testes","1sUj5JqqTyxDQNu8J1GMpzyzfbV3QCAm1","ListEx 4b, CE-237.","PDF")]},
 {title:"Relatórios e entregáveis",resources:[t2report,t2slides,ref("Vídeo da apresentação","Registro da revisão do time.","Vídeo",file("1t7rhR3mArT0fXy-wsLaoEopvx7w78GeE")),dir("Entregáveis","1CBaO2hylsJHEZvglYAXX8xHIz3Q8sEs1","Relatório, apresentação e vídeo.")]},
 {title:"Documentação técnica",resources:[contract,issue(107,"US221 T1 — contrato de dados"),doc("Contrato API JSON","1WtQgKKmrZ2T2r0GR87adEjHAzA_e1owd","Especificação coletiva da comunicação.","Markdown"),doc("Schema PostgreSQL legado","1r8TGV67HMJaWGkihWwQBkr6XA0BxKXv9","Arquivo original; não reproduzido no site.","SQL"),dir("Documentos de consulta","1MXgYXf8HuunmbDDvVIy9q1G7AWE0FY0H","Acervo técnico.")]},
 {title:"Acervo oficial",resources:[dir("Pasta principal TS2","11O59grcnogc6hX6L_T4Fq4T7OVRO-Qnn","Pasta da Sprint 2."),dir("Atas","11UupbEKYEbCFgo2BWK8xvAY4fCHROZHS","Registros semanais."),dir("Gravações","1ENLTkzuSMSXUpHEJzGITXVP5TrtbAQX8","Duas gravações localizadas; transcrições não localizadas nesta pasta."),dir("Documentos e artefatos","1RvEMBwzynW4KqsfPWEoq12xgLDn-guOt","Artefatos de gestão e engenharia."),...sprint2Common,...common]}
 ]
},
time3:{
 id:"time3",sprint:3,number:3,name:"Time Scrum 3",segment:"Integração · Time 1 + Time 2",period:"02/11/2026 a 27/11/2026",back:"/list5",
 intro:"O Time 3 reúne os segmentos espacial e terrestre para integrar o protótipo acadêmico: telemetria, API/legado, banco unificado, barramento, HMI e telecomandos. O objetivo é validar fluxos ponta a ponta e preparar a apresentação final, não presumir homologação integral.",
 context:[
 {title:"Convergência da arquitetura",text:"US330–333: integração da API com o legado, roteamento bidirecional, banco PostgreSQL/PostGIS, ingestão automatizada e telecomandos. RabbitMQ e Docker suportam o ambiente integrado; a formalização da junção dos times ainda exigia alinhamento nas atas."},
 {title:"Contribuição individual e infraestrutura",text:"A ata de 24/11 registra o deploy do backend e frontend da API US330 por Leonardo na estação Raspberry de Cirineu. A contribuição individual evolui US123/US221, usa armazenamento isolado e teste com telemetria simulada; não equivale à API coletiva, infraestrutura de Cirineu ou aceite dos demais fluxos."},
 {title:"Verificação e governança",text:"US334–337 abrangem testes integrados/CPU, Terraform Cloud, catálogo de testes CE-237 e auditoria CE-230. A ata de 24/11 registra licenças ativas, dificuldade de VPN para uma atividade, validação cloud ainda dependente de acesso e organização da apresentação de 30/11."}
 ],
 stories:[
 story("US330","Integração do legado e roteamento bidirecional da API","Issue fechada","Deploy individual relatado em 24/11; T2 filtragem #162 fechada, de outro integrante. Campanha coletiva TC022/TC024 registrada; TC023 e critérios globais exigem verificação.",146),
 story("US331","Unificação de esquemas: PostGIS e legado","Issue aberta","T1–T5 (#163–167) fechadas; relatório técnico de banco unificado registra validação local.",147),
 story("US332","Conector de telecomandos Solo → Espaço","Issue fechada","Contrato, topologia RabbitMQ, gateways, ciclo de bordo e E2E (#179–185); TC027 passou no ambiente documentado.",149),
 story("US333","Ingestão e população automatizada dos bancos","Issue aberta","T3 #160 fechada; T1, T2 e T4 ainda abertas. TC032 documenta critérios aprovados e achados de código.",152),
 story("US334","Testes integrados ponta a ponta e CPU","Issue fechada","TC034–036 fechadas; consolidação da evidência não equivale a homologação irrestrita.",151),
 story("US335","Configurar Terraform Cloud","Issue aberta","Validação local passou; homologação remota bloqueada por ambiente GCP/HCP.",148),
 story("US336","Casos de testes","Issue aberta","Matriz e casos de integração/banco (#168–169) fechados; segurança, infraestrutura e consolidação (#170–172) abertas.",150),
 story("US337","Plano de auditoria","Issue aberta","WT1 e checklists #173–175 fechados; consolidação e reavaliação #176–177 abertas.",153)
 ],
 results:[
 {title:"TC022 e TC024 — campanha coletiva",text:"Relatório de 24/11 registra PASS no recorte: 15.000/15.000 por patamar de 100 e 500 ms (300 s cada), p95 HTTP→AMQP de 5,856 ms e 20 inválidos rejeitados. A campanha usa API Next.js, broker e banco coletivos; não é o ensaio pessoal FastAPI. Issues #192/#194 ainda abertas na consulta.",source:tc330},
 {title:"US331 T5 — banco unificado",text:"Validação de 19/11: 17/17 tabelas, 52 índices, RBAC 18/18 e SLA ≤ 30 ms no ambiente relatado. Issue pai #147 permanece aberta.",source:tc331},
 {title:"TC027 — resiliência do telecomando",text:"Execução de 24/11 registra 20/20 critérios e recuperação após interrupções de telemetria e broker no ambiente Docker especificado.",source:tc332},
 {title:"TC032 — ingestão e idempotência",text:"500 linhas e 10 eventos DLQ no ensaio de 19/11; três achados white-box registrados. A aprovação parcial não encerra a US333.",source:tc333},
 {title:"TC034 — teste integrado",text:"Consolidação de 25/11 reavaliou captura de 24/11 com 23/23 verificações e smoke de 60 s com 3.000/3.000 pacotes; o smoke não substitui o soak de 30 min nem comprova aprovação de CPU.",source:tc334},
 {title:"TC037–039 — infraestrutura cloud",text:"Verificações locais Terraform PASS, homologação remota BLOCKED sem ambiente autorizado. Não houve comprovação de provisionamento em nuvem.",source:tc335}
 ],
 limitations:["Status de issues corresponde à consulta de 27/11/2026; fechamento não comprova aceite global. Planilha de testes e resultados de execução podem ter datas e estados distintos.","O relatório sintético encontrado está marcado [MODELO] e contém referências a outras USs; não foi usado como evidência definitiva. A apresentação final localizada não confirma que a revisão de 30/11 ocorreu.","Os vídeos da pasta coletiva estão marcados [MODELO]; não foi localizado vídeo definitivo. O Kanban #7 foi informado e referenciado na List 5, mas a abertura externa não foi reconfirmada.","Telemetria simulada, implantação individual e ensaios coletivos são evidências distintas. Integração geral, cloud e pendências de auditoria devem ser avaliadas separadamente."],
 meetings:[
 meeting("05/11/2026","Planejamento das USs e convergência dos segmentos.","Ata e Gemini registram definição inicial de tarefas, APIs, unificação de bancos, risco de licenças e distribuição do trabalho. Trata-se de planejamento, não conclusão.",[ata("1I7XZty3DwYCWc27zOHZytdg0F576KW0Y","05/11/2026"),transcript("1zCMXUlRahqoxEQeaiSgBpHc3SK4fO8zO","05/11/2026"),video("1boxEsL9k6m0gaqbTnfuAJw5tWDSF_U_4","05/11/2026")]),
 meeting("10/11/2026","Infraestrutura, integração de dashboards e backlog.","Gemini descreve RabbitMQ e migração do dashboard para Next.js; ata confirma formalização da junção ainda pendente, início das tarefas e risco de licenças.",[ata("1SDPS1NNIn92VQe4an-36Bthw-DfXOUHP","10/11/2026"),transcript("17z8_OB8oyieLCQz92eCOK4to9vUvP8zy","10/11/2026"),video("1wIny8Ua_jXhl11nnhQ9gepotxvtX7hWS","10/11/2026")]),
 meeting("17/11/2026","Revisão de backlog, esquemas e preparação de deploy.","Ata registra revisão US332, início de US334 e análise do deploy no Raspberry; Gemini destaca unificação de esquemas e necessidade de alinhar painéis e dados. A licença ainda estava pendente.",[ata("1dbddsFQmrBO2jPP039b_N8QSUACbIGqQ","17/11/2026"),transcript("1qJNKutSeAHCliA5t3m6_k7Urq5gYcsVh","17/11/2026"),video("1juY7Q-tYJWGslInE8z5GsawMHoV1NRs4","17/11/2026")]),
 meeting("24/11/2026","Deploy US330, integração de telecomandos e revisão final.","Ata relata deploy individual por Leonardo e dependência de dados do segmento espacial, licenças ativas, integração de telecomandos e validação Terraform ainda condicionada a acesso. Gemini registra demonstração Docker e planejamento da apresentação; os testes versionados confirmam recortes específicos, não aceite integral.",[ata("1A0uaplGAQkmmPoHEg3vLJFNQDZCEhqkn","24/11/2026"),transcript("1M1IJtHDKTfYQEVT7yzl2kmSRknRV2GCj","24/11/2026"),video("1jTb6l3UjBo9CQL2x44eLsn5ZhlON__A2","24/11/2026")])
 ],
 groups:[
 {title:"Gestão, backlog e testes",resources:[ref("Kanban Sprint 3","Quadro #7 fornecido no prompt e referenciado na List 5; acesso direto não reconfirmado.","GitHub",org+"/projects/7"),ref("Issues TS3 · Sprint 3","Consulta por identificadores do time e casos de teste.","GitHub",repo+"/issues?q="+encodeURIComponent("is:issue [TS03][S3]")),doc("Burndown Chart — Sprint 3","1WmQd2V6w3JzvFwyfZxMMbusCIvu7BTOg","Gráfico oficial; valores não reproduzidos.","Planilha"),doc("Casos de teste TS3","1tMkaCvbmUCSw1ZwD26DUwm7lZVMDhUUX","Matriz CE-237 e casos especificados, incluindo TC022–039.","XLSX"),issue(146,"US330 — integração da API"),issue(162,"US330 T2 — filtragem e tratamento"),issue(150,"US336 — casos de teste"),issue(153,"US337 — plano de auditoria")]},
 {title:"Resultados de testes versionados",resources:[tc330,tc331,tc332,tc333,tc334,tc335]},
 {title:"Relatórios e entregáveis",resources:[dir("Relatórios coletivos","1cwX3qcCuLOT9vsN6qcqGxKuy8MxtcrQ1","Somente modelo localizado; relatório definitivo pendente de confirmação."),doc("Relatório sintético TS3 — modelo","1UXPWG-yUcTBzTMnRhohOSTwN0b-v5TVE","Marcado [MODELO]; não usar como entrega definitiva.","DOCX"),doc("Apresentação final SPRB-TR/BD","1-yw9NbQoGTi4goAiM5CrTMOkYvkPbYga","Arquivo localizado; revisão final prevista em 30/11.","PPTX"),doc("Roteiro da apresentação final","1QzrQz68Lub5tovGPtz1a3ulbWvNGYfUO","Organização da apresentação.","DOCX"),dir("Apresentações","1xHrvQG68NdOQnHysHqNaIT5KhEb6rLt3","Arquivo de trabalho e modelo."),dir("Vídeos — modelos","1D4lsM0nAKP3iUHNy_DXTUDVRnx9-hEBL","Três vídeos com identificação [MODELO]; não confirmados como entregas."),dir("Entregáveis","1eWMhA3_X5zDhqqF_3OdyW5-XAu9HAipv","Acervo coletivo."),dir("Apresentação final — geral","1H28JkWXkBgFuEY_Z_5hlHdML5-PJcBXb","Pasta geral da apresentação.")]},
 {title:"Acervo oficial",resources:[dir("Pasta principal TS3","1zRbfFMc0THL3rkthhSxK4F-0QXqFWIXl","Time de integração."),dir("Atas","1BnYPfwWn-JC0HY9DMqDwB0MaFJMGg_qj","Quatro registros semanais."),dir("Gravações","1IX-fjcFFnWIRM3mSR-HvDIXpvpTNdX_G","Gravações originais."),dir("Transcrições","1nd8rFsz4K272_KAu9zrR3oKVrpA0D63n","Anotações Gemini."),dir("Documentos e artefatos","1QkIzRH8WCZPOJsUj2FP8hdKv8OC8acN9","Artefatos do time."),dir("Drive coletivo da Sprint 3","1CcNIQkawWR_4PCOV0FT12OZGVTrFNzmg","Pasta coletiva."),...common]}
 ]
}
};
