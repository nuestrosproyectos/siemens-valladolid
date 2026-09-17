/* Reparación Siemens Valladolid — app.js (JS puro, sin dependencias, sin peticiones externas) */
(function () {
  'use strict';
  var CONFIG = {
    TEL: '641 153 922', TEL_HREF: 'tel:+34641153922',
    WA: '641 153 922', WA_BASE: 'https://wa.me/34641153922?text=',
    MARCA: 'Siemens', MARCA_RE: /\b(SIEMENS)\b/g, SAT_TXT: '<a href="https://www.siemens-home.bsh-group.com/es" rel="nofollow noopener" target="_blank">siemens-home.bsh-group.com/es</a> · 976 305 714', ETIQUETA: 'E-Nr', F_ES_E: true,
    FORM_ENDPOINT: '' /* vacío = envío por WhatsApp (canal citado en Privacidad); si se activa un proveedor, actualizar Privacidad */
  };
  var CODIGOS=[{"id":"e00-lavadora","cod":"E:00 / E:10","ap":"lavadora","keys":["E00","E0","E10"],"titulo":"Error genérico de electrónica","sig":"La electrónica ha detectado un fallo sin clasificar; Siemens indica reiniciar antes de nada.","pasos":["Apagar la lavadora, esperar 5 segundos y volver a encender","Si vuelve a salir, desenchufar 10 minutos"],"sem":"verde","llamar":"Si reaparece tras el reinicio: módulo de control."},{"id":"e16-lavadora","cod":"E16/F16","ap":"lavadora","keys":["E16"],"titulo":"Puerta mal cerrada","sig":"La lavadora detecta que la puerta no ha cerrado bien.","pasos":["Abrir y cerrar la puerta con firmeza","Retirar prendas atrapadas en la goma"],"sem":"verde","llamar":"Si persiste con la puerta bien cerrada: cierre o bloqueo de puerta."},{"id":"e17-lavadora","cod":"E17/F17","ap":"lavadora","keys":["E17"],"titulo":"Entrada de agua insuficiente","sig":"No entra agua suficiente en el tiempo previsto.","pasos":["Grifo abierto y con presión (unos 10 l/min)","Manguera de entrada sin dobleces","Limpiar el filtro de la manguera de entrada"],"sem":"verde","llamar":"Con agua, presión y filtro limpio, y persiste: electroválvula o caudalímetro."},{"id":"e18-lavadora","cod":"E18/F18","ap":"lavadora","keys":["E18"],"titulo":"No desagua","sig":"La lavadora no vacía el agua: filtro de la bomba, manguera o sifón obstruidos.","pasos":["Limpiar el filtro de la bomba (portezuela inferior delantera)","Revisar la manguera de desagüe y el sifón","Buscar monedas u objetos en la bomba"],"sem":"verde","llamar":"Filtro limpio y sigue igual → bomba de desagüe."},{"id":"e19-lavadora","cod":"E19/F19","ap":"lavadora","keys":["E19"],"titulo":"No calienta","sig":"Se ha excedido el tiempo de calentamiento: resistencia o sonda NTC.","pasos":[],"sem":"ambar","llamar":"Siempre (resistencia o sonda de temperatura)."},{"id":"e21-lavadora","cod":"E21/F21 · E57","ap":"lavadora","keys":["E21","E57"],"titulo":"Motor / inverter","sig":"Fallo en el motor iQdrive o en su módulo inverter.","pasos":["Parar la lavadora y desconectarla"],"sem":"ambar","llamar":"Siempre. Casi siempre es el módulo, no el motor."},{"id":"e23-lavadora","cod":"E23/F23","ap":"lavadora","keys":["E23"],"titulo":"aquaStop activado (fuga)","sig":"Hay agua en la base de la lavadora: el sistema aquaStop ha detectado una fuga.","pasos":[],"sem":"ambar","llamar":"Siempre. Cierra el grifo y no la sigas usando."},{"id":"e32-lavadora","cod":"E32","ap":"lavadora","keys":["E32"],"titulo":"Carga desequilibrada","sig":"La ropa se ha apelotonado y la lavadora no centrifuga por seguridad.","pasos":["Redistribuir la ropa dentro del tambor","No lavar una sola prenda pesada (edredón, alfombra) sola"],"sem":"verde","llamar":"Si repite con la carga bien repartida: amortiguadores o sensor de desequilibrio."},{"id":"e33-lavadora","cod":"E33","ap":"lavadora","keys":["E33"],"titulo":"Exceso de espuma","sig":"Demasiado detergente: la lavadora no puede aclarar ni centrifugar.","pasos":["Poner menos detergente (o revisar la dosis del i-Dos)","Hacer un ciclo de aclarado en vacío"],"sem":"verde","llamar":"Si repite con la dosis correcta."},{"id":"e34-lavadora","cod":"E34","ap":"lavadora","keys":["E34"],"titulo":"Puerta no cerrada correctamente","sig":"El bloqueo de puerta no ha enganchado, a menudo por exceso de carga.","pasos":["Cerrar la puerta con firmeza","Reducir la carga si el tambor está muy lleno"],"sem":"verde","llamar":"Si persiste: cierre de puerta."},{"id":"e01-lavavajillas","cod":"E01–E05","ap":"lavavajillas","keys":["E01","E02","E03","E04","E05","E1","E2","E3"],"titulo":"Fallo de electrónica / programa interrumpido","sig":"La electrónica ha interrumpido el programa (Siemens los agrupa como fallo de electrónica).","pasos":["Apagar, esperar unos minutos y reiniciar","Si repite, cerrar el grifo y desenchufar 10 minutos"],"sem":"verde","llamar":"Si repite tras el reinicio: módulo de potencia."},{"id":"e06-lavavajillas","cod":"E06","ap":"lavavajillas","keys":["E06","E6"],"titulo":"Sensor de puerta / electrónica","sig":"El sensor de puerta o la electrónica no confirman el cierre.","pasos":["Cerrar bien la puerta y reiniciar"],"sem":"ambar","llamar":"Si persiste: sensor de puerta o módulo."},{"id":"e07-lavavajillas","cod":"E07 / E31","ap":"lavavajillas","keys":["E07","E7","E31"],"titulo":"Fallo del sistema de secado","sig":"El sistema de secado (ventilador o zeolita) no funciona.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e09-lavavajillas","cod":"E09","ap":"lavavajillas","keys":["E09","E9"],"titulo":"Circuito de calentamiento","sig":"No calienta el agua ni seca: fallo del circuito de calentamiento.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e10-lavavajillas","cod":"E10 / E11","ap":"lavavajillas","keys":["E10","E11"],"titulo":"Calentador / sensor de temperatura","sig":"Fallo en el calentador de paso o en la sonda NTC.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e12-lavavajillas","cod":"E12","ap":"lavavajillas","keys":["E12"],"titulo":"Sistema de calentamiento calcificado","sig":"La cal ha cubierto el calentador; Siemens indica descalcificar.","pasos":["Descalcificar con un producto adecuado, siguiendo el manual","Revisar el nivel de sal y la dureza programada"],"sem":"verde","llamar":"Si repite tras descalcificar."},{"id":"e14-lavavajillas","cod":"E14 / E18","ap":"lavavajillas","keys":["E14","E18"],"titulo":"Entrada de agua insuficiente","sig":"No entra agua o no llega al nivel previsto (icono del grifo).","pasos":["Grifo abierto y manguera sin dobleces","Limpiar el filtro de la manguera de entrada"],"sem":"verde","llamar":"Si persiste: caudalímetro o electroválvula aquaStop."},{"id":"e15-lavavajillas","cod":"E15","ap":"lavavajillas","keys":["E15"],"titulo":"Agua en la base (aquaStop)","sig":"El aquaStop ha detectado agua en la bandeja de la base.","pasos":["Inclinar el lavavajillas 45° hacia atrás para vaciar la bandeja","Buscar fugas visibles en la puerta o las mangueras"],"sem":"verde","llamar":"Si reaparece: fuga interna."},{"id":"e22-lavavajillas","cod":"E22","ap":"lavavajillas","keys":["E22"],"titulo":"Filtros obstruidos","sig":"Los filtros del fondo de la cuba están sucios y no hay presión en los brazos.","pasos":["Limpiar el filtro fino y el grueso","Limpiar los brazos aspersores"],"sem":"verde","llamar":"Si persiste con todo limpio."},{"id":"e24-lavavajillas","cod":"E24 / E25","ap":"lavavajillas","keys":["E24","E25"],"titulo":"No desagua","sig":"Manguera de desagüe obstruida o acodada, o bomba bloqueada.","pasos":["Revisar la manguera de desagüe y el sifón","Limpiar la bomba de desagüe (cristales, huesos)"],"sem":"verde","llamar":"Si persiste: bomba de desagüe."},{"id":"e01-secadora","cod":"E01/E02","ap":"secadora","keys":["E01","E02","E1","E2"],"titulo":"Filtro de pelusas obstruido","sig":"El filtro de la puerta o el del zócalo están saturados (o con restos de suavizante).","pasos":["Limpiar el filtro de la puerta","Limpiar el filtro del zócalo (base)"],"sem":"verde","llamar":"Si persiste con los filtros limpios."},{"id":"e03-secadora","cod":"E03","ap":"secadora","keys":["E03","E3"],"titulo":"Desagüe de condensación obstruido","sig":"El agua de condensación no se evacúa: tubo acodado, sifón o depósito lleno.","pasos":["Vaciar el depósito de condensados","Revisar el tubo de desagüe y el sifón"],"sem":"verde","llamar":"Si persiste: bomba de condensados."},{"id":"e06-secadora","cod":"E06","ap":"secadora","keys":["E06","E6"],"titulo":"Circuito de calentamiento","sig":"Avería del circuito de calor (bomba de calor): no calienta.","pasos":[],"sem":"ambar","llamar":"Siempre: en bomba de calor solo técnico."},{"id":"e08-secadora","cod":"E08/E09","ap":"secadora","keys":["E08","E09","E8","E9"],"titulo":"Fallo electrónico / calentamiento crítico","sig":"La electrónica ha detectado un fallo grave o una temperatura fuera de rango.","pasos":["Desenchufar 10 minutos y volver a probar"],"sem":"ambar","llamar":"Siempre si reaparece."},{"id":"e56-secadora","cod":"E:56 / E:63","ap":"secadora","keys":["E56","E63"],"titulo":"Comunicación mandos–potencia","sig":"Los dos módulos de la secadora no se comunican; a menudo es el conector.","pasos":["Desconectar 10 minutos y volver a encender"],"sem":"ambar","llamar":"Si persiste tras el reinicio."},{"id":"cre-secadora","cod":"CrE / CArE","ap":"secadora","keys":["CRE","CARE"],"titulo":"Aviso de mantenimiento (limpieza)","sig":"No es error: la secadora pide el programa de limpieza del condensador.","pasos":["Ejecutar el programa de limpieza según el manual"],"sem":"verde","llamar":"Solo si el aviso no desaparece tras el programa.","aviso":1},{"id":"alarma-frigorifico","cod":"Alarma / parpadeo de temperatura","ap":"frigorifico","keys":["ALARMA","PILOTO","PITA","PARPADEA"],"titulo":"Temperatura demasiado alta","sig":"Puerta abierta, carga grande o corte de luz. No es un código E.","pasos":["Comprobar que la puerta cierra bien","No sobrecargar; esperar un día entero tras una carga grande","Silenciar con el botón de alarma una vez comprobado"],"sem":"verde","llamar":"Si persiste pasado un día entero sin puerta abierta ni corte de luz.","aviso":1},{"id":"e20-frigorifico","cod":"E20","ap":"frigorifico","keys":["E20"],"titulo":"Comunicación placa–display","sig":"La placa de potencia y el display no se comunican.","pasos":["Desenchufar 5–10 minutos y volver a enchufar"],"sem":"ambar","llamar":"Si persiste tras el reinicio."},{"id":"e01-frigorifico","cod":"E01–E09","ap":"frigorifico","keys":["E01","E02","E03","E04","E05","E06","E07","E08","E09","E1","E2","E3","E4","E5","E6","E7","E8","E9"],"titulo":"Sensor, ventilador o compresor (según modelo)","sig":"Familia de errores de sensores de temperatura, ventilador, compresor o noFrost; el significado exacto cambia según el modelo.","pasos":[],"sem":"ambar","llamar":"Siempre. Con E03 puedes limpiar las rejillas traseras y reiniciar 5 minutos antes."},{"id":"e15-frigorifico","cod":"E15","ap":"frigorifico","keys":["E15"],"titulo":"Bandeja de desagüe desbordada","sig":"El desagüe de deshielo está obstruido y la bandeja rebosa.","pasos":["Limpiar el orificio de desagüe con un bastoncillo y agua templada","Vaciar la bandeja trasera si es accesible"],"sem":"verde","llamar":"Si la bandeja está rota o sigue rebosando."},{"id":"alarma-congelador","cod":"Alarma sonora / piloto","ap":"congelador","keys":["ALARMA","PILOTO","PITA","PARPADEA"],"titulo":"Temperatura demasiado alta","sig":"Aviso tras un corte de luz, la puerta abierta o una carga grande. No es un código E.","pasos":["Comprobar que la puerta cierra bien","Comprobar si ha habido un corte de luz","Silenciar con el botón de alarma una vez comprobado"],"sem":"verde","llamar":"Si vuelve a saltar sin corte de luz ni puerta abierta.","aviso":1},{"id":"e20-congelador","cod":"E20","ap":"congelador","keys":["E20"],"titulo":"Comunicación placa–display","sig":"La placa de potencia y el display no se comunican.","pasos":["Desenchufar 5–10 minutos y volver a enchufar"],"sem":"ambar","llamar":"Si persiste tras el reinicio."},{"id":"e01-congelador","cod":"E01–E09","ap":"congelador","keys":["E01","E02","E03","E04","E05","E06","E07","E08","E09","E1","E2","E3","E4","E5","E6","E7","E8","E9"],"titulo":"Sensor, ventilador o compresor (según modelo)","sig":"Familia de errores de sensor de temperatura, ventilador, compresor o noFrost; el significado exacto cambia según el modelo.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e011-horno","cod":"E011","ap":"horno","keys":["E011"],"titulo":"Tecla pulsada demasiado tiempo","sig":"El panel detecta una tecla pulsada de forma continua o atascada.","pasos":["Limpiar y secar el panel de mandos","Pulsar las teclas una a una para ver si alguna se ha quedado enganchada"],"sem":"verde","llamar":"Si persiste con el panel limpio y seco: panel de mandos."},{"id":"e115-horno","cod":"E115","ap":"horno","keys":["E115"],"titulo":"Temperatura demasiado alta","sig":"El horno ha superado la temperatura máxima de seguridad.","pasos":["Apagar y dejar enfriar 30 minutos","Borrar el aviso con la tecla del reloj"],"sem":"verde","llamar":"Si repite: sonda de temperatura o relé."},{"id":"e305-horno","cod":"E305","ap":"horno","keys":["E305"],"titulo":"Sin comunicación entre placas","sig":"El panel y la placa de potencia no se comunican.","pasos":["Apagar en el diferencial 1 minuto y reiniciar"],"sem":"ambar","llamar":"Si persiste tras el reinicio."},{"id":"e1-horno","cod":"E1 (Er1) / E2","ap":"horno","keys":["E1","E01","ER1","E2","E02","ER2"],"titulo":"Sensor de temperatura / conexión de red","sig":"E1: sonda de temperatura averiada. E2: fallo en la conexión eléctrica del horno.","pasos":[],"sem":"ambar","llamar":"Siempre (con E2, electricista o técnico). El significado puede variar según el modelo."},{"id":"e3-horno","cod":"E3","ap":"horno","keys":["E3","E03","ER3"],"titulo":"Ventilador de refrigeración activo","sig":"Protección: el ventilador sigue enfriando el horno. No es avería si desaparece al enfriar.","pasos":["Esperar a que el horno se enfríe con la puerta cerrada"],"sem":"verde","llamar":"Si el aviso no se apaga con el horno frío."},{"id":"e6-horno","cod":"E6 / E7 (Er6/Er7)","ap":"horno","keys":["E6","E06","ER6","E7","E07","ER7"],"titulo":"Bloqueo de puerta (pirólisis)","sig":"El bloqueo de seguridad de la puerta no abre o no cierra durante activeClean.","pasos":[],"sem":"ambar","llamar":"Siempre; espera a que baje la temperatura y no fuerces la puerta."},{"id":"safe-horno","cod":"Llave / SAFE","ap":"horno","keys":["SAFE","LLAVE","L","BLOQUEO"],"titulo":"Bloqueo infantil","sig":"El bloqueo infantil está activado: el horno no responde a las teclas.","pasos":["Mantener pulsada la tecla llave unos 4 segundos"],"sem":"verde","llamar":"Solo si no se desbloquea así."},{"id":"u400-placa","cod":"U400","ap":"placa","keys":["U400"],"titulo":"Placa mal conectada (fases)","sig":"La conexión eléctrica de la placa no es correcta; sale casi siempre tras la instalación.","pasos":[],"sem":"ambar","llamar":"Siempre: desconecta en el diferencial y que un técnico revise el esquema de conexión."},{"id":"e9000-placa","cod":"E9000","ap":"placa","keys":["E9000"],"titulo":"Tensión de red fuera de límites","sig":"La tensión que llega a la placa está fuera del rango admitido.","pasos":[],"sem":"ambar","llamar":"Siempre; no es la placa: compañía eléctrica o electricista."},{"id":"f1-placa","cod":"F1 / F6 / F01","ap":"placa","keys":["F1","F01","F6","F06"],"titulo":"Zona sobrecalentada","sig":"Una zona se ha apagado por temperatura excesiva (olla vacía o muy caliente).","pasos":["Retirar la olla y dejar enfriar la zona","Volver a encender cuando desaparezca el aviso"],"sem":"verde","llamar":"Si repite en frío: sensor de la zona."},{"id":"f2-placa","cod":"F2 / F02","ap":"placa","keys":["F2","F02"],"titulo":"Electrónica sobrecalentada","sig":"La electrónica se ha calentado demasiado (uso largo a potencia máxima o powerBoost).","pasos":["Dejar enfriar la placa","Comprobar que el mueble deja ventilar la parte inferior"],"sem":"verde","llamar":"Si repite con ventilación correcta: ventilador o módulo."},{"id":"f5-placa","cod":"F5","ap":"placa","keys":["F5","F05"],"titulo":"Objeto caliente sobre los mandos","sig":"Hay una olla u objeto caliente sobre la zona de mandos.","pasos":["Retirar el objeto y dejar enfriar el cristal"],"sem":"verde","llamar":"Si sale sin nada encima: sensor del panel."},{"id":"de-placa","cod":"dE","ap":"placa","keys":["DE","DEMO"],"titulo":"Modo demostración activado","sig":"La placa está en modo tienda: enciende pero no calienta.","pasos":["Desconectar 30 segundos en el diferencial","Al volver, pulsar cualquier tecla según el manual"],"sem":"verde","llamar":"Si no sale del modo demostración."},{"id":"e0-placa","cod":"E0 / E1 / E3","ap":"placa","keys":["E0","E00","E1","E01","E3","E03"],"titulo":"Olla no apta o fallo electrónico","sig":"E0/E1: el recipiente no es ferromagnético o es muy pequeño. E3: fallo electrónico.","pasos":["Usar una olla apta (un imán se pega a la base)","Reiniciar desde el diferencial 20 segundos"],"sem":"ambar","llamar":"Si persiste con olla apta: módulo de inducción."},{"id":"e16-lavasecadora","cod":"E16/F16","ap":"lavasecadora","keys":["E16"],"titulo":"Puerta mal cerrada","sig":"La lavasecadora detecta que la puerta no ha cerrado bien.","pasos":["Abrir y cerrar la puerta con firmeza","Retirar prendas atrapadas en la goma"],"sem":"verde","llamar":"Si persiste con la puerta bien cerrada: cierre."},{"id":"e17-lavasecadora","cod":"E17/F17","ap":"lavasecadora","keys":["E17"],"titulo":"Entrada de agua insuficiente","sig":"No recibe agua suficiente para el lavado.","pasos":["Grifo abierto y manguera sin dobleces","Limpiar el filtro de la manguera de entrada"],"sem":"verde","llamar":"Con agua y filtro limpio, y persiste: electroválvula."},{"id":"e18-lavasecadora","cod":"E18/F18","ap":"lavasecadora","keys":["E18"],"titulo":"No desagua","sig":"No vacía el agua: filtro de la bomba, manguera o sifón obstruidos.","pasos":["Limpiar el filtro de la bomba (portezuela inferior)","Revisar la manguera de desagüe y el sifón"],"sem":"verde","llamar":"Filtro limpio y sigue igual → bomba de desagüe."},{"id":"e19-lavasecadora","cod":"E19/F19","ap":"lavasecadora","keys":["E19"],"titulo":"No calienta el agua","sig":"Tiempo de calentamiento excedido en el lavado: resistencia o sonda.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"e23-lavasecadora","cod":"E23/F23","ap":"lavasecadora","keys":["E23"],"titulo":"aquaStop activado (fuga)","sig":"Hay agua en la base: el aquaStop ha detectado una fuga.","pasos":[],"sem":"ambar","llamar":"Siempre. Cierra el grifo y no la sigas usando."},{"id":"e32-lavasecadora","cod":"E32","ap":"lavasecadora","keys":["E32"],"titulo":"Carga desequilibrada","sig":"La ropa se ha apelotonado y no centrifuga por seguridad.","pasos":["Redistribuir la ropa en el tambor","No cargar una sola prenda pesada"],"sem":"verde","llamar":"Si repite con la carga bien repartida: amortiguadores."},{"id":"e34-lavasecadora","cod":"E34","ap":"lavasecadora","keys":["E34"],"titulo":"Puerta no cerrada correctamente","sig":"El bloqueo de puerta no ha enganchado, a menudo por exceso de carga.","pasos":["Cerrar la puerta con firmeza","Reducir la carga"],"sem":"verde","llamar":"Si persiste: cierre de puerta."},{"id":"filtro-campana","cod":"Indicador de filtro","ap":"campana","keys":["FILTRO","INDICADOR","SATURACION"],"titulo":"Filtro antigrasa saturado","sig":"Aviso electrónico de saturación del filtro: no es un código de error.","pasos":["Lavar el filtro antigrasa metálico (lavavajillas o agua caliente)","Resetear el indicador según el manual (mantener pulsado el botón)"],"sem":"verde","llamar":"Si el indicador no se apaga tras limpiar y resetear, o si no aspira con el filtro limpio.","aviso":1}];
var APARATOS={"lavadora":{"id":"lavadora","nombre":"Lavadora","art":"una lavadora","slug":"lavadora"},"lavavajillas":{"id":"lavavajillas","nombre":"Lavavajillas","art":"un lavavajillas","slug":"lavavajillas"},"frigorifico":{"id":"frigorifico","nombre":"Frigorífico","art":"un frigorífico","slug":"frigorifico"},"horno":{"id":"horno","nombre":"Horno","art":"un horno","slug":"horno"},"secadora":{"id":"secadora","nombre":"Secadora","art":"una secadora","slug":"secadora"},"placa":{"id":"placa","nombre":"Placa de inducción","art":"una placa","slug":"placa"},"congelador":{"id":"congelador","nombre":"Congelador","art":"un congelador","slug":"congelador"},"lavasecadora":{"id":"lavasecadora","nombre":"Lavasecadora","art":"una lavasecadora","slug":"lavasecadora"},"campana":{"id":"campana","nombre":"Campana extractora","art":"una campana","slug":"campana"}};
  var REL = document.documentElement.getAttribute('data-rel') || '';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var wa = function (t) { return CONFIG.WA_BASE + encodeURIComponent(t); };
  var ico = function (id, cls) { return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- zona (memoria de sesión) */
  var Z = {
    get: function () { try { return sessionStorage.getItem('zona') || ''; } catch (e) { return ''; } },
    set: function (v) { try { v ? sessionStorage.setItem('zona', v) : sessionStorage.removeItem('zona'); } catch (e) { } }
  };
  if (document.body.getAttribute('data-zona')) Z.set(document.body.getAttribute('data-zona'));
  var zonaTxt = function () { return Z.get() || '[tu barrio o municipio]'; };

  /* ---------- horario */
  function abierto() {
    var d = new Date(), h = d.getHours() + d.getMinutes() / 60, w = d.getDay();
    if (w >= 1 && w <= 5) return h >= 8 && h < 20;
    if (w === 6) return h >= 9 && h < 14;
    return false;
  }
  if (!abierto()) $$('[data-chip-hora]').forEach(function (el) { el.textContent = 'Te llamamos a primera hora (L–V desde las 8)'; });

  /* ---------- barra inferior: solo cuando los CTA del hero no se ven */
  var barra = $('.barra');
  if (barra) {
    var heroCta = $('[data-hero-cta]');
    var setBarra = function (on) { barra.classList.toggle('on', on); document.body.classList.toggle('barra-on', on); };
    if (heroCta && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { setBarra(!es[0].isIntersecting && es[0].boundingClientRect.top < 0 || (!es[0].isIntersecting && window.scrollY > 300)); }, { threshold: 0.2 }).observe(heroCta);
    } else setBarra(true);
  }

  /* ---------- modal de llamada en escritorio */
  var esEscritorio = window.matchMedia('(hover:hover) and (pointer:fine)').matches && window.innerWidth >= 1024;
  var modal = $('#modal-tel');
  if (modal && esEscritorio) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (!a) return;
      e.preventDefault(); modal.classList.add('on'); $('.cerrar', modal).focus();
    });
    $('.cerrar', modal).addEventListener('click', function () { modal.classList.remove('on'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('on'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('on'); });
    var cp = $('[data-copiar]', modal);
    if (cp) cp.addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText('641153922').then(function () { cp.textContent = 'Copiado: 641 153 922'; });
    });
  }

  /* ---------- vídeo del hero: solo 4G, en viewport, sin reduced-motion ni ahorro de datos */
  var v = $('video[data-src]');
  if (v) {
    var c = navigator.connection || {};
    var okRed = !c.saveData && (!c.effectiveType || c.effectiveType === '4g');
    if (window.innerWidth < 900 && v.getAttribute('data-src-m')) v.setAttribute('data-src', v.getAttribute('data-src-m'));
    if (okRed && !reduced && 'IntersectionObserver' in window) {
      var cargado = false;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) {
          if (!cargado) { cargado = true; v.src = v.getAttribute('data-src'); v.load(); v.addEventListener('playing', function () { v.classList.add('on'); }, { once: true }); }
          v.play().catch(function () { });
        } else if (cargado) v.pause();
      }, { threshold: 0.1 }).observe(v);
    }
  }

  /* ---------- reveals */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  /* ---------- síntomas (subpáginas) */
  $$('.sint-b').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.nextElementSibling, on = b.getAttribute('aria-expanded') === 'true';
      $$('.sint-b', b.closest('.sint')).forEach(function (o) { o.setAttribute('aria-expanded', 'false'); o.nextElementSibling.classList.remove('on'); });
      if (!on) { b.setAttribute('aria-expanded', 'true'); p.classList.add('on'); }
    });
  });
  /* WhatsApp con zona en enlaces marcados */
  $$('a[data-wa]').forEach(function (a) {
    a.addEventListener('click', function () { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); });
    a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt()));
  });

  /* ================================================================ BUSCADOR */
  var APW = { lavasecadora: ['LAVASECADORA', 'LAVASECADORAS'], lavadora: ['LAVADORA', 'LAVADORAS'], lavavajillas: ['LAVAVAJILLAS', 'LAVAPLATOS'], congelador: ['CONGELADOR', 'CONGELADORES', 'ARCON'], frigorifico: ['FRIGORIFICO', 'FRIGO', 'NEVERA', 'COMBI', 'AMERICANO', 'FRIGORIFICOS'], secadora: ['SECADORA', 'SECADORAS'], horno: ['HORNO', 'HORNOS'], campana: ['CAMPANA', 'EXTRACTORA'], caldera: ['CALDERA', 'CONDENS', 'CALEFACCION'], calentador: ['CALENTADOR', 'TERMO', 'THERM'], 'aire-acondicionado': ['AIRE', 'ACONDICIONADO', 'SPLIT', 'CLIMA', 'CLIMATIZACION', 'CLIMATE'], placa: ['PLACA', 'INDUCCION', 'VITRO', 'VITROCERAMICA', 'ENCIMERA'] };
  function sinAcentos(s) { return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s; }
  function parse(q) {
    var up = sinAcentos(q).toUpperCase(), ap = null;
    Object.keys(APW).forEach(function (k) { APW[k].forEach(function (w) { var re = new RegExp('\\b' + w + '\\b'); if (re.test(up)) { ap = ap || k; up = up.replace(re, ' '); } }); });
    var sinRelleno = up.replace(/\b(ERROR|CODIGO|CODE|DE|MI|LA|EL|MARCA|UN|UNA)\b/g, ' ');
    if (sinRelleno.trim()) up = sinRelleno; /* si la consulta es solo «dE» (código de puerta en LG), no se vacía */
    if (CONFIG.MARCA_RE) up = up.replace(CONFIG.MARCA_RE, ' ');
    var k = up.replace(/[\s\-\._:\/]/g, '');
    k = k.replace(/^O(?=\d)/, 'E').replace(/O(?=\d)/g, '0').replace(/(\d)O/g, '$10');
    if (/^\d+$/.test(k)) k = 'E' + k;
    var alt = CONFIG.F_ES_E && /^F\d/.test(k) ? k.replace(/^F/, 'E') : null;
    return { key: k, alt: alt, ap: ap, fIn: !!alt };
  }
  function buscar1(key, ap, prefijo) {
    return CODIGOS.filter(function (c) {
      if (ap && c.ap !== ap) return false;
      return c.keys.some(function (k) { return prefijo ? k.indexOf(key) === 0 : k === key; });
    });
  }
  function buscar(key, ap, prefijo, alt) {
    var r = buscar1(key, ap, prefijo);
    if (!r.length && alt) r = buscar1(alt, ap, prefijo);
    return r;
  }
  function semTxt(c) { return c.sem === 'verde' ? 'Puedes comprobarlo tú en 2 minutos' : 'Mejor llamar directamente'; }
  function textoWA(c, pasos) {
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var t = 'Hola, tengo ' + a.art + ' ' + CONFIG.MARCA + ' que marca ' + codigo + '. ';
    if (pasos && pasos.length) t += 'He probado: ' + pasos.join(', ').toLowerCase() + ' y sigue igual. ';
    return t + 'Estoy en ' + zonaTxt();
  }
  function renderFicha(c, opts) {
    opts = opts || {};
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var h = '<article class="ficha' + (c.sem === 'ambar' ? ' hot' : '') + '" data-id="' + c.id + '">';
    h += '<div class="ficha-h"><span class="ficha-cod">' + esc(c.cod) + '</span><span class="ficha-ap">' + ico(a.id) + esc(a.nombre) + ' <span class="marca">' + esc(CONFIG.MARCA) + '</span></span></div>';
    h += '<p class="ficha-t">' + esc(c.titulo) + '</p><p class="ficha-s">' + esc(c.sig) + '</p>';
    h += '<span class="sem sem-' + c.sem + '">' + semTxt(c) + '</span>';
    if (c.pasos.length) {
      h += '<ul class="chk" aria-label="Autocomprobación">' + c.pasos.map(function (p, i) { return '<li><label><input type="checkbox" data-paso="' + i + '"><span>' + esc(p) + '</span></label></li>'; }).join('') + '</ul>';
      h += '<div class="sigue" role="group" aria-label="Resultado"><p>¿Sigue marcando ' + esc(codigo) + '?</p><div class="g"><button type="button" class="si">Sí, sigue igual</button><button type="button" class="no">Se ha arreglado</button></div></div>';
    }
    h += '<div class="llamar-c' + (c.pasos.length ? '' : ' on') + '"><b>Cuándo llamar</b>' + esc(c.llamar) + '</div>';
    h += '<div class="ok-c">Nos alegramos. Si vuelve a marcarlo, aquí estamos. <a class="link" href="' + REL + a.slug + '/">Cómo cuidar tu ' + esc(a.nombre.toLowerCase()) + ' →</a></div>';
    h += '<div class="ficha-cta"><a class="btn btn-wa" data-cta-wa href="' + wa(textoWA(c, [])) + '" target="_blank" rel="noopener">' + ico('wa') + 'WhatsApp con el código</a>';
    h += '<a class="btn btn-amber" data-cta-tel href="' + CONFIG.TEL_HREF + '">' + ico('tel') + 'Llamar · ' + CONFIG.TEL + '</a></div>';
    h += '<div class="ficha-links"><a class="link" href="' + REL + a.slug + '/">Ver todo sobre ' + esc(a.art) + ' ' + esc(CONFIG.MARCA) + ' →</a><button type="button" data-copy="' + c.id + '">Copiar enlace a este código</button></div>';
    h += '<p class="ficha-fin">Presupuesto por escrito en casa antes de tocar nada. Si tu aparato tiene menos de 3 años, tiene garantía legal del fabricante: ' + CONFIG.SAT_TXT + '</p>';
    return h + '</article>';
  }
  function bindFicha(el) {
    var id = el.getAttribute('data-id'), c = CODIGOS.filter(function (x) { return x.id === id; })[0];
    if (!c || el.__b) return; el.__b = true;
    var chk = $$('input[type=checkbox]', el), sigue = $('.sigue', el), llamar = $('.llamar-c', el), ok = $('.ok-c', el);
    var bWa = $('[data-cta-wa]', el), bTel = $('[data-cta-tel]', el);
    var codigo = c.cod.split('/')[0].trim();
    var pasos = function () { return chk.filter(function (i) { return i.checked; }).map(function (i) { return i.nextElementSibling.textContent; }); };
    var refresca = function () { bWa.href = wa(textoWA(c, pasos())); };
    chk.forEach(function (i) {
      i.addEventListener('change', function () {
        refresca();
        if (chk.every(function (x) { return x.checked; })) { sigue.classList.add('on'); } else { sigue.classList.remove('on'); }
      });
    });
    if (sigue) {
      $('.si', sigue).addEventListener('click', function () {
        llamar.classList.add('on'); ok.classList.remove('on'); el.classList.add('hot'); refresca();
        bTel.innerHTML = ico('tel') + 'Que me llame un técnico · 60,50 € IVA incl., se descuenta';
        bTel.setAttribute('href', '#contacto'); bTel.removeAttribute('data-cta-tel');
        bTel.addEventListener('click', function (e) { e.preventDefault(); prefill(c.ap, codigo); });
        $('.si', sigue).setAttribute('aria-pressed', 'true'); $('.no', sigue).removeAttribute('aria-pressed');
      });
      $('.no', sigue).addEventListener('click', function () {
        ok.classList.add('on'); llamar.classList.remove('on'); el.classList.remove('hot');
        $('.no', sigue).setAttribute('aria-pressed', 'true'); $('.si', sigue).removeAttribute('aria-pressed');
      });
    }
    var cp = $('[data-copy]', el);
    if (cp) cp.addEventListener('click', function () {
      var url = new URL(REL + 'codigos-error/#' + c.id, location.href).href;
      var done = function () { cp.textContent = 'Enlace copiado'; setTimeout(function () { cp.textContent = 'Copiar enlace a este código'; }, 2500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Copia el enlace:', url); });
      else prompt('Copia el enlace:', url);
    });
    refresca();
  }
  $$('.ficha[data-id]').forEach(bindFicha);

  function initBus(root) {
    var input = $('input', root), sug = $('.bus-sug', root), res = $('.bus-res', root), x = $('.bus-x', root);
    var apFijo = root.getAttribute('data-ap') || null, ap = apFijo, sel = -1, items = [];
    var chips = $$('.chip-btn[data-ap]', root);
    /* atajos «más buscados»: al elegir un aparato solo se ofrecen SUS códigos (nunca los de otro aparato) */
    var top = $('.bus-top', root), topHTML = top ? top.innerHTML : '';
    function bindAtajos() {
      $$('[data-cod]', root).forEach(function (b) { if (b._ok) return; b._ok = 1; b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-cod'); })[0]; if (!c) return; if (ap && c.ap !== ap) { setAp(c.ap); } input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    function pintaAtajos(k) {
      if (!top || apFijo) return;
      if (!k) { top.innerHTML = topHTML; bindAtajos(); return; }
      var a = APARATOS[k], mios = CODIGOS.filter(function (c) { return c.ap === k && !c.aviso; }).slice(0, 8), av = CODIGOS.filter(function (c) { return c.ap === k && c.aviso; });
      if (!mios.length && !av.length) { top.innerHTML = '<span class="bus-top-nota">' + esc(a.nombre) + ': sin códigos verificados de ' + esc(CONFIG.MARCA) + '. Dinos el síntoma y te decimos qué puede ser.</span>'; return; }
      top.innerHTML = 'Códigos de ' + esc(a.nombre.toLowerCase()) + ': <ul class="chips">' + mios.concat(av).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-cod="' + c.id + '">' + esc(c.cod.split('/')[0]) + '</button></li>'; }).join('') + '</ul>';
      bindAtajos();
    }
    var setAp = function (k) {
      ap = k; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === k ? 'true' : 'false'); });
      pintaAtajos(k);
      if (input.value.trim()) go(input.value); else if (res) { res.innerHTML = ''; }
    };
    chips.forEach(function (b) { b.addEventListener('click', function () { setAp(ap === b.getAttribute('data-ap') ? null : b.getAttribute('data-ap')); if (b.getAttribute('data-ap') === 'placa' && placaSinCodigos()) placa(); }); });
    bindAtajos();
    function limpia() { sug.classList.remove('on'); sug.innerHTML = ''; sel = -1; items = []; input.setAttribute('aria-expanded', 'false'); }
    function muestra(c) {
      if (ap && c.ap !== ap && !apFijo) { ap = c.ap; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === c.ap ? 'true' : 'false'); }); pintaAtajos(c.ap); }
      limpia(); res.innerHTML = renderFicha(c); bindFicha($('.ficha', res));
      if (!reduced && root.getAttribute('data-scroll') !== 'no') setTimeout(function () { res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
    }
    function ambiguo(list, key) {
      res.innerHTML = '<div class="bus-amb"><p>' + esc(key) + ' existe en varios aparatos. ¿En cuál?</p><div class="g">' +
        list.map(function (c) { return '<button type="button" data-id="' + c.id + '">' + ico(c.ap) + esc(APARATOS[c.ap].nombre) + '</button>'; }).join('') + '</div></div>';
      $$('button', res).forEach(function (b) { b.addEventListener('click', function () { muestra(CODIGOS.filter(function (c) { return c.id === b.getAttribute('data-id'); })[0]); }); });
    }
    function nada(raw, key, apq, pre) {
      var a = apq ? APARATOS[apq] : null, art = a ? a.art : 'mi aparato';
      var quiza = (pre && pre.length) ? '<p>¿Querías decir…?</p><ul class="chips" style="margin-bottom:14px">' + pre.slice(0, 5).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-id="' + c.id + '">' + ico(c.ap) + c.cod.split('/')[0] + ' · ' + esc(APARATOS[c.ap].nombre) + '</button></li>'; }).join('') + '</ul>' : '';
      var t = 'Hola, ' + (a ? 'tengo ' + art + ' ' + CONFIG.MARCA + ' que marca ' : 'mi aparato ' + CONFIG.MARCA + ' marca ') + key + '. ¿Me decís qué puede ser? Estoy en ' + zonaTxt();
      res.innerHTML = '<div class="bus-no"><p>No tenemos <strong class="mono">' + esc(key) + '</strong>' + (a ? ' en ' + esc(a.nombre.toLowerCase()) : '') + ' verificado con documentación de <span class="marca">' + esc(CONFIG.MARCA) + '</span> y preferimos no inventarlo. Escríbenoslo igual y te decimos qué puede ser.</p>' + quiza +
        '<a class="btn btn-wa" href="' + wa(t) + '" target="_blank" rel="noopener">' + ico('wa') + 'Preguntar por WhatsApp</a>' +
        '<p class="ficha-fin">Manda también una foto de la etiqueta ' + esc(CONFIG.ETIQUETA) + ' (en la puerta o el marco del aparato): así te contestamos con el modelo exacto. <a class="link" href="' + REL + 'codigos-error/#enr">Dónde está el ' + esc(CONFIG.ETIQUETA) + ' →</a></p></div>';
      $$('button[data-id]', res).forEach(function (b) { b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-id'); })[0]; input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    /* la placa solo va «por síntomas» si la marca no publica códigos verificados para ella (Siemens sí los tiene) */
    function placaSinCodigos() { return !!APARATOS.placa && !CODIGOS.some(function (c) { return c.ap === 'placa'; }); }
    function placa() {
      limpia();
      var ss = ['no detecta la olla', 'parpadea', 'se apaga por temperatura'];
      res.innerHTML = '<div class="bus-no"><p>Las placas <span class="marca">' + esc(CONFIG.MARCA) + '</span> avisan por símbolos y parpadeos, no por códigos verificables: dinos el síntoma.</p><ul class="chips">' +
        ss.map(function (s) { return '<li><a class="chip chip-btn" target="_blank" rel="noopener" href="' + wa('Hola, tengo una placa ' + CONFIG.MARCA + ' que ' + s + '. Estoy en ' + zonaTxt()) + '">' + ico('wa') + esc(s) + '</a></li>'; }).join('') +
        '</ul><p class="ficha-fin mt16"><a class="link" href="' + REL + 'placa/">Placa de inducción: por síntomas, no por códigos →</a></p></div>';
    }
    function go(raw) {
      var p = parse(raw), apq = ap || p.ap;
      if (apq === 'placa' && placaSinCodigos()) { placa(); return; }
      if (!p.key && apq) { var av = CODIGOS.filter(function (c) { return c.ap === apq && c.aviso; }); if (av.length === 1) return muestra(av[0]); }
      if (!p.key) { res.innerHTML = ''; limpia(); return; }
      var ex = buscar(p.key, apq, false, p.alt);
      if (ex.length === 1) return muestra(ex[0]);
      if (ex.length > 1) { limpia(); return ambiguo(ex, p.key); }
      var pre = buscar(p.key, apq, true, p.alt);
      if (pre.length === 1 && p.key.length < 3) return muestra(pre[0]);
      limpia(); nada(raw, p.key, apq, pre);
    }
    function sugiere() {
      var raw = input.value, p = parse(raw), apq = ap || p.ap;
      x.classList.toggle('on', !!raw);
      if (!p.key || p.key.length < 2 || (apq === 'placa' && placaSinCodigos())) { limpia(); return; }
      var seen = {}, list = buscar(p.key, apq, true, p.alt).filter(function (c) { return !seen[c.id] && (seen[c.id] = 1); }).slice(0, 5);
      var ex = buscar(p.key, apq, false, p.alt); if (ex.length) list = ex.concat(list.filter(function (c) { return ex.indexOf(c) < 0; })).slice(0, 5);
      if (!list.length) { limpia(); return; }
      items = list; sel = -1;
      sug.innerHTML = list.map(function (c, i) {
        var k = c.keys.filter(function (y) { return y.indexOf(p.key) === 0 || (p.alt && y.indexOf(p.alt) === 0); })[0] || c.cod;
        var disp = c.cod; if (c.cod.indexOf(k) < 0 && c.cod.indexOf(k.replace(/^E/, 'F')) < 0) disp = k + ' (' + c.cod + ')';
        var m = disp.indexOf(p.key) >= 0 ? disp.replace(p.key, '<mark>' + p.key + '</mark>') : (p.alt ? disp.replace(p.alt, '<mark>' + p.alt + '</mark>') : disp);
        return '<li role="option" id="' + root.id + '-o' + i + '" data-id="' + c.id + '"><span class="mono">' + m + '</span><span class="ap">' + esc(APARATOS[c.ap].nombre) + '</span><span>' + esc(c.titulo) + '</span></li>';
      }).join('');
      if (p.fIn && !buscar1(p.key, apq, true).length) sug.innerHTML += '<li style="cursor:default;color:#55636F;font-size:12px">En ' + esc(CONFIG.MARCA) + ', F y E son el mismo código (F18 = E18)</li>';
      sug.classList.add('on'); input.setAttribute('aria-expanded', 'true');
      $$('li[data-id]', sug).forEach(function (li) { li.addEventListener('mousedown', function (e) { e.preventDefault(); input.value = li.querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === li.getAttribute('data-id'); })[0]); }); });
    }
    input.addEventListener('input', sugiere);
    input.addEventListener('keydown', function (e) {
      var lis = $$('li[data-id]', sug);
      if (e.key === 'ArrowDown' && lis.length) { e.preventDefault(); sel = (sel + 1) % lis.length; }
      else if (e.key === 'ArrowUp' && lis.length) { e.preventDefault(); sel = (sel - 1 + lis.length) % lis.length; }
      else if (e.key === 'Enter') { e.preventDefault(); if (sel >= 0 && lis[sel]) { input.value = lis[sel].querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === lis[sel].getAttribute('data-id'); })[0]); } else go(input.value); return; }
      else if (e.key === 'Escape') { limpia(); return; }
      else return;
      lis.forEach(function (li, i) { li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); });
      input.setAttribute('aria-activedescendant', sel >= 0 ? lis[sel].id : '');
    });
    input.addEventListener('blur', function () { setTimeout(limpia, 150); });
    x.addEventListener('click', function () { input.value = ''; res.innerHTML = ''; limpia(); x.classList.remove('on'); input.focus(); });
    var f = $('form', root); if (f) f.addEventListener('submit', function (e) { e.preventDefault(); go(input.value); });
    root.__go = function (q) { input.value = q; go(q); };
  }
  $$('.bus').forEach(initBus);

  /* ---------- hub: abrir ancla y hacer scroll */
  function abreAncla() {
    var h = location.hash.replace('#', ''); if (!h) return;
    var d = document.getElementById(h);
    if (d && d.tagName === 'DETAILS') { d.open = true; setTimeout(function () { d.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }, 60); }
  }
  abreAncla(); window.addEventListener('hashchange', abreAncla);

  /* ================================================================ FORMULARIO */
  var form = $('#form-llamada');
  function prefill(apId, codigo) {
    if (!form) return;
    if (apId) $$('[name=aparato]', form).forEach(function (r) { r.checked = r.value === APARATOS[apId].nombre; });
    if (codigo) { $('[name=codigo]', form).value = codigo; var s = $$('[name=sintoma]', form).filter(function (r) { return r.value === 'Error en pantalla'; })[0]; if (s) s.checked = true; }
    form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { $('[name=telefono]', form).focus({ preventScroll: true }); }, 500);
  }
  window.RBV = { prefill: prefill, zona: Z };
  function abreWA(t) { var w = window.open(wa(t), '_blank'); if (w) w.opener = null; else location.href = wa(t); }
  if (form) {
    var zsel = $('[name=zona]', form);
    if (zsel) { if (Z.get()) zsel.value = Z.get(); zsel.addEventListener('change', function () { Z.set(zsel.value); $$('a[data-wa]').forEach(function (a) { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); }); }); }
    var dl = $('#lista-codigos'); if (dl) { var ks = {}; CODIGOS.forEach(function (c) { c.keys.forEach(function (k) { if (k.length > 2) ks[k] = APARATOS[c.ap].nombre; }); }); dl.innerHTML = Object.keys(ks).sort().map(function (k) { return '<option value="' + k + '">' + ks[k] + '</option>'; }).join(''); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', form).value) return; /* honeypot */
      var tel = $('[name=telefono]', form), g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, '');
      var okTel = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !okTel);
      var rg = $('[name=rgpd]', form), gr = rg.closest('.f-g'); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = ($$('[name=aparato]:checked', form)[0] || {}).value || '', si = ($$('[name=sintoma]:checked', form)[0] || {}).value || '';
      var cod = $('[name=codigo]', form).value.trim().toUpperCase(), zona = zsel ? zsel.value : '';
      var t = 'Hola, quiero que me llaméis.';
      if (ap) t += ' Aparato: ' + ap + ' ' + CONFIG.MARCA + '.'; if (si) t += ' Le pasa: ' + si.toLowerCase() + '.'; if (cod) t += ' Código: ' + cod + '.';
      if (zona) t += ' Zona: ' + zona + '.'; t += ' Teléfono: ' + tel.value.trim() + '.';
      var fin = function () { form.hidden = true; var ok = $('.f-ok', form.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus(); };
      if (CONFIG.FORM_ENDPOINT) {
        fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ aparato: ap, sintoma: si, codigo: cod, telefono: tel.value, zona: zona, mensaje: t }) })
          .then(function (r) { if (!r.ok) throw 0; fin(); }).catch(function () { abreWA(t); fin(); });
      } else { abreWA(t); fin(); }
    });
  }

  /* ---------- mini formulario del hero (landings de aparato) */
  function validaTel(tel) { var g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, ''); var ok = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !ok); return ok; }
  $$('.form-mini').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', f).value) return;
      var tel = $('[name=telefono]', f), rg = $('[name=rgpd]', f), gr = rg.closest('.f-g');
      var okTel = validaTel(tel); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = $('[name=aparato]', f).value, si = $('[name=sintoma]', f).value;
      var t = 'Hola, quiero que me llaméis. Aparato: ' + ap + ' ' + CONFIG.MARCA + '.' + (si ? ' Le pasa: ' + si.toLowerCase() + '.' : '') + (Z.get() ? ' Zona: ' + Z.get() + '.' : '') + ' Teléfono: ' + tel.value.trim() + '.';
      abreWA(t); f.hidden = true; var ok = $('.f-ok', f.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus();
    });
  });
  var hfb = $('.hero-form-b');
  if (hfb) hfb.addEventListener('click', function () { var on = hfb.getAttribute('aria-expanded') === 'true'; hfb.setAttribute('aria-expanded', on ? 'false' : 'true'); hfb.parentNode.classList.toggle('on', !on); if (!on) setTimeout(function () { $('.form-mini [name=telefono]').focus({ preventScroll: false }); }, 50); });
  /* ---------- desplegable de aparatos (cabecera) */
  var dd = $('.dd');
  if (dd) {
    var ddb = $('.dd-b', dd);
    ddb.addEventListener('click', function () { var on = dd.classList.toggle('on'); ddb.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
  }

  /* ================================================================ MAPA de zonas */
  var mapa = $('.mapa');
  if (mapa) {
    var info = $('.mapa-info', mapa), zs = $$('.z', mapa);
    var pinta = function (z) {
      zs.forEach(function (o) { o.classList.toggle('on', o === z); });
      var n = z.getAttribute('data-nombre'), href = z.getAttribute('data-href'); Z.set(n);
      info.innerHTML = '<p class="kicker">Cubrimos ' + esc(n) + '</p><h3>Llama al <a class="link" href="' + CONFIG.TEL_HREF + '">' + CONFIG.TEL + '</a></h3><p>' + esc(z.getAttribute('data-txt') || '') + '</p>' +
        '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ' + n) + '">' + ico('wa') + 'WhatsApp desde ' + esc(n) + '</a>' +
        (href ? '<a class="btn btn-ghost btn-sm" href="' + href + '">Ver ' + esc(n) + ' →</a>' : '<a class="btn btn-ghost btn-sm" href="#contacto">Te llamamos en &lt; 1 h</a>') + '</div>';
      if (zsel) zsel.value = n;
    };
    zs.forEach(function (z) { z.addEventListener('click', function () { pinta(z); }); z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pinta(z); } }); });
  }
})();
