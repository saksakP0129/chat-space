$(function(){
    
    function buildHTML(message){
        if ( message.image ) {
          var html =
            `
            <div class="message" data-message-id=${message.id}>
              <div class="messages--block" >
              <div class="messages--block__1">
                ${message.user_name}
                <div class="messages--block__1--day">
                  ${message.created_at}
                </div>
              </div>
               <div class="messages--block__2">
                  <p class="lower-message__content">
                   ${message.content}
                  </p>
               </div>
               <img src="${message.image}" >
            </div>
            </div>`
          return html;
        } else {
          var html =
          
          `
          <div class="message" data-message-id=${message.id}>
          <div class="messages--block" data-messege-id=${message.id} >
            <div class="messages--block__1">
              ${message.user_name}
              <div class="messages--block__1--day">
                ${message.created_at}
              </div>
            </div>
               <div class="messages--block__2">
                  <p class="lower-message__content">
                    ${message.content}
                 </p>
               </div>

            </div>
          </div>`
      ;}  
      return html;
    };
    
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
        $(".message--send").prop('disabled', false);
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });

    })


    var reloadMessages = function() {
      var last_message_id = $('.message:last').data("message-id");
      console.table(last_message_id)
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log(messages)
        if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
      })
      .fail(function() {
        alert('error');
      });
      
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000)
    }
  })