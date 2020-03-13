
$(function(){
    function buildHTML(message){
        if ( message.image ) {
          var html =
            `<div class="messages--block">
                <div class="messages--block__1">
                  ${message.user_name}
                <div class="messages--block__1--day">
                  ${message.created_at}
                </div>
              </div>
              <div class="messages--block__2">
                <p class="lower-message__content">
                  ${message.content}
                </p
              <img src="${message.image}" >
            </div>
            </div>`
          return html;
        } else {
          var html =
          `<div class="messages--block">
          <div class="messages--block__1">
            ${message.user_name}
          <div class="messages--block__1--day">
            ${message.created_at}
          </div>
        </div>
        <div class="messages--block__2">
          <p class="lower-message__content">
            ${message.content}
          </p
        </div>
      </div>`
          return html;
        };
      }
$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);      
        $('form')[0].reset();
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .always(function(){
        $(".message--send").prop('disabled', false);
    })    
    .fail(function() {
        alert("メッセージ送信に失敗しました");
    })
  })
});