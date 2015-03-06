function objetoAjax(){
	var xmlhttp=false;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
 
	try {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} catch (E) {
		xmlhttp = false;
	}
}
 
if (!xmlhttp && typeof XMLHttpRequest!="undefined") {
	  xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

var $codigo;
var $contrato

			function consultarcentro(){
			var codigo = $("#codigo").val();
			var centrodecosto = $("#centro");
			if(codigo != "NULL"){
				//INSTACION EL OBJETO AJAX
				ajax = objetoAjax();
				//USAMOS EL METODO POST AL ARCHIVO QUE RELAIZARA LA IOPERACION
				ajax.open("POST","Procedientos/consultar_centro.php",true);
				ajax.onreadystatechange = function() {
					if (ajax.readyState==1) {
						centrodecosto.val("CARGANDO CENTRO DE COSTOS");
					}
						if (ajax.readyState==4) {
							centrodecosto.val(ajax.responseText);
						}
					}		
						ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
						ajax.send("codigo="+codigo)
				}	
			}	
			//FUNSION PARA CONSULTAR ASESORES POR NUMERO DE CEDULA
function consultarAsesor(){
	var documento = $('#doc').val();
	var documentoVaciar = $('#doc');
	var nom1 = $('#nombre1');
	var nom2 = $('#nombre2');
	var ape1 = $('#apellido1');
	var ape2 = $('#apellido2');
	var centrocostos = $('#codigo');
	var contrato = $('#contrato');
	var excepcion = $('#excepcion');
	var elemento;
	var array = [];
		if(documento != "NULL"){
			//INSTACION EL OBJETO AJAX
			ajax = objetoAjax();
			//USAMOS EL METODO POST AL ARCHIVO QUE RELAIZARA LA OPERACION
			ajax.open("POST","Procedientos/consultar_cedula.php",true);
			ajax.onreadystatechange = function() {
				if (ajax.readyState==1) {
					nom1.val("Cargando");
				}		
					if (ajax.readyState==4) {	
						
						if (ajax.responseText == 0){
						alert("NO EXISTE NINGUN REGISTRO CON ESTE DOCUMENTO");
						documentoVaciar.val("");
						nom1.val("");
						nom2.val("");
						ape1.val("");
						ape2.val("");
						centrocostos.val("");			
						contrato.val("");
						excepcion.val("");
						documentoVaciar.focus();
						documentoVaciar.val("");
					}else{
						
						elemento = ajax.responseText;
						array = elemento.split(',');
						var exc = parseInt(array[6]);
						var cod = parseInt(array[4]);
						//ASIGNO VALORES A LOS CAMPOS			
						nom1.val(array[0]);
						nom2.val(array[1]);
						ape1.val(array[2]);
						ape2.val(array[3]);
						centrocostos.val(cod);			
						contrato.val(array[5]);
						excepcion.val(exc);							
					} 
					}
					
												
								
				}
					ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
					ajax.send("doc="+documento)						
		}	
}
			//FUNSIO PARA CONSULTAR ASESORES POR CADA CENTRO DE COSTOS	
			function AsesorCentroCostos(){
				codigo = $('#codigo').val();
				var mostrarestado = $('#codigo');
				var tabla = $('#contenedorTabla');
				if(codigo != null){
					//INSTANCIO EL OBJETO AJAX
					ajax = objetoAjax();
					//USAMOS EL METODO POST AL ARCHIVO QUE REALIZARA LA OPERACION
					ajax.open("POST","Procedientos/consultarAsesorCcostos.php", true);
					ajax.onreadystatechange = function(){
						if(ajax.readyState == 1){
							mostrarestado.val("RECOPILANDO LA INFORMACION");
						}
						if(ajax.readyState == 4){
							var data = ajax.responseText;
							tabla.html(data);
							mostrarestado.val(codigo);
						}
					}
					ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
					ajax.send("codigo="+codigo);	
				}
			}
//FUNSIO PARA CONSULTAR ASESORES SEGUN EL ESTADO DEL CONTRATO	
	function AsesorEstadoContrato(){
		var contrato = $('#contrato').val();
		codigo;
		var mostrarestado = $('#contrato');
		var tabla = $('#contenedorTabla');
			if(contrato != null){
				//INSTANCIO EL OBJETO AJAX
				ajax = objetoAjax();
				//USAMOS EL METODO POST AL ARCHIVO QUE REALIZARA LA OPERACION
				ajax.open("POST","Procedientos/Consultar_estado_contrato.php", true);
				ajax.onreadystatechange = function(){
					if(ajax.readyState == 1){
						mostrarestado.val("RECOPILANDO LA INFORMACION");
					}
					if(ajax.readyState == 4){	
						
						var data = ajax.responseText;
						tabla.html(data);
						
					}
				}
				ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				ajax.send("contrato="+contrato, "codigo="+codigo);
				
				
			}
	}
				//FUNSION PARA LISTAR LOS ASESORES TENIENDO EN CUENTA SI SON EXCEPCIONES O NO
				function AsesorExcepciones(){
				var excepcion = $('#Excepcion').val();
				var mostrarestado = $('#Excepcion');
				var tabla = $('#contenedorTabla');
					if(excepcion != null){
						//INSTANCIO EL OBJETO AJAX
						ajax = objetoAjax();
						//USAMOS EL METODO POST AL ARCHIVO QUE REALIZARA LA OPERACION
						ajax.open("POST","Procedientos/consultarExcepciones.php", true);
						ajax.onreadystatechange = function(){
							if(ajax.readyState == 1){
								mostrarestado.val("RECOPILANDO LA INFORMACION");
							}
									if(ajax.readyState == 4){	
									var data = ajax.responseText;
									tabla.html(data);
								}
							}
								ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
								ajax.send("excepcion="+excepcion);	
					}
				}
				//FUNSION PARA FILTRA ASEOSR POR NUMERO DE CEDULA
				function buscarAsesor(){
				var doc = $('#doc').val();
				var tabla = $('#contenedorTabla');
					if(doc != null){
						//INSTANCIO EL OBJETO AJAX
						ajax = objetoAjax();
						//USAMOS EL METODO POST AL ARCHIVO QUE REALIZARA LA OPERACION
						ajax.open("POST","Procedientos/Filtrar_asesor.php", true);
						ajax.onreadystatechange = function(){
							if(ajax.readyState == 1){
								//mostrarestado.val("RECOPILANDO LA INFORMACION");
							}
									if(ajax.readyState == 4){	
									var data = ajax.responseText;
									
									tabla.html(data);
								}
							}
								ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
								ajax.send("documento="+doc);	
					}
				}
				//CON ESTA FUNSION SE LLENA LA LISTA DE EMPLEADOS AL CARGAR EL MODULO DE OCNSULTAS
				function llenarAsesores(){
				var doc = $('#doc').val();
				var tabla = $('#contenedorTabla');
					if(doc != null){
						//INSTANCIO EL OBJETO AJAX
						ajax = objetoAjax();
						//USAMOS EL METODO POST AL ARCHIVO QUE REALIZARA LA OPERACION
						ajax.open("POST","Procedientos/cargarAsesores.php", true);
						ajax.onreadystatechange = function(){
							if(ajax.readyState == 1){
								//mostrarestado.val("RECOPILANDO LA INFORMACION");
							}
									if(ajax.readyState == 4){	
									var data = ajax.responseText;
									
									tabla.html(data);
								}
							}
								ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
								ajax.send("documento="+doc);	
					}
				}
				//FUNSION REPORTES CENTRO DE COSTOS
				function ReporteCentroCostos(){
				codigo = $('#codigo').val();
				var mostrarestado = $('#codigo');
				var tabla = $('#contenedorTabla');
				if(codigo != null){
					//INSTANCIO EL OBJETO AJAX
					ajax = objetoAjax();
					//USAMOS EL METODO POST AL ARCHIVO QUE REALIZARA LA OPERACION
					ajax.open("POST","Procedientos/reportePDF", true);
					ajax.onreadystatechange = function(){
						if(ajax.readyState == 1){
							mostrarestado.val("RECOPILANDO LA INFORMACION");
						}
						if(ajax.readyState == 4){
							
						}
					}
					ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
					ajax.send("codigo="+codigo);	
				}
			}
			function validarRegistro(){
				var doc = $('#doc').val();
				var documento = $('#doc');
					if(doc != null){
						//INSTANCIO EL OBJETO AJAX
						ajax = objetoAjax();
						//USAMOS EL METODO POST AL ARCHIVO QUE REALIZARA LA OPERACION
						ajax.open("POST","Procedientos/verificarRegistro.php", true);
						ajax.onreadystatechange = function(){
							if(ajax.readyState == 1){
								//mostrarestado.val("RECOPILANDO LA INFORMACION");
							}
									if(ajax.readyState == 4){	
									var nombre = (ajax.responseText);
									
									if(nombre == 1 || nombre == 2){
										var confirmar=confirm("ESTE REGISTRO YA ESXISTE EN LA BASE DE DATOS, DESEAS EDITAR SU INFORMACION");
										if (confirmar){
											alert("INGRESA NUEVAMENTE EL NUMEO DE CEDULA PARA VISUALIZARLA");
											document.location=("./Editar_asesor.php");
										}
										else{
											document.location=("./registrar_asesor.php");
										}
									}
								}
							}
								ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
								ajax.send("documento="+doc);	
					}
				}

				
			
					
		
			
			
		
		
	
	