$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();

    // 为发送按钮绑定事件
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim();
        if (text.length <= 0) {
            return $('#ipt').val('')
        };
        // 如果用户输入了聊天内容，则追加到页面上显示
        $('#talk_list').append(' <li class="right_word"><img src="img/person02.png" /><span>' + text + '</span></li>')
        $('#ipt').val('');
        resetui();
        getMsg(text)
    });
    // 获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                if (res.message === 'success') {
                    // 接受聊天消息
                    var msg = res.data.info.text;
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>');
                    resetui();
                    getVoice(msg);
                }
            }
        })
    }
    // 语音转换为语音
    function getVoice(text) {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }
    // 使用回车发送
    $('#ipt').on('keyup', function (e) {
        if (e.keyCode == 13) {
            $('#btnSend').click()
        }
    })
})