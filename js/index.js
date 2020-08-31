$(function(){
    $("[data-toogle='tooltip']").tooltip();
    $("[data-toogle='popover']").popover();
    $('.carousel').carousel({
      interval: 2000
    });
    $("#contacto").on('show.bs.modal', function(e){
      console.log('el modal se esta mostrando');
      $("#contactoBtn").removeClass('btn-success');
      $("#contactoBtn").addClass('btn-primary');
      $("#contactoBtn").prop('disabled', true);
    });
    $("#contacto").on('shown.bs.modal', function(e){
      console.log('el modal se mostro');
    });
    $("#contacto").on('hide.bs.modal', function(e){
      console.log('el modal se esta ocultando');
    });
    $("#contacto").on('hidden.bs.modal', function(e){
      console.log('el modal se oculto');
      $("#contactoBtn").removeClass('btn-primary');
      $("#contactoBtn").addClass('btn-success');
      $("#contactoBtn").prop('disabled', false);
    });
  });