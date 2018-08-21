// -------   Mail Send ajax

$(document).ready(function() {
  var form = $("#myForm"); // contact form
  var submit = $(".submit-btn"); // submit button
  var alert = $(".alert-msg"); // alert div for show alert message

  // form submit event
  form.on("submit", function(e) {
    e.preventDefault(); // prevent default form submit

    $.ajax({
      url: "/mail", // form action url
      method: "POST", // form submit method get/post
      // dataType: 'html', // request type html/json/xml
      data: form.serialize(), // serialize form data
      beforeSend: function() {
        form.append(
          "<div class='alert alert-primary text-center animated flash' role='alert'>Enviando mensaje...</div>"
        );
        // alert.fadeIn();
        // submit.html("Sending...."); // change submit button text
      },
      success: function(data) {
        form.find(".alert-primary").hide();
        form.append(
          "<div class='alert alert-success text-center' role='alert'><h4 class='alert-heading'>Mensaje enviado!</h4><hr><p>En breve nos pondremos en contacto contigo.</p></div>"
        );
        console.log(data);
        // alert.html(data).fadeIn(); // fade in response data
        form.trigger("reset"); // reset form
        // submit.attr("style", "display: none !important"); // reset submit button text
      },
      error: function(e) {
        console.log(e);
        form.find(".alert-primary").hide();
        form.append(
          "<div class='alert alert-danger text-center animated flash' role='alert'>Hubo un error. Intente nuevamente</div>"
        );
      }
    });
  });
});
