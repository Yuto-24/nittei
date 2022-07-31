$(function() {
    var urlSearch = location.search;
    urlSearch = urlSearch.slice(1);
    urlSearch = decodeURI(urlSearch);
    //console.log(urlSearch);  
    if (urlSearch) {
        $("#result").val(urlSearch);
        $("h1").html(urlSearch + "メーカー");
    }


    var onSelectTimeFlag;
    var onSelectDateFlag = false;

    $('#datetimepicker').datetimepicker({
        formatTime: 'H:i',
        formatDate: 'd.m.Y',
        defaultTime: '8:30',
        inline: true,
        step: 30,
        lang: 'ja',
        timepickerScrollbar: false,
        onSelectDate: function(dateText) {
            var now_result = $("#result").val();
            $(".copy_btn").removeClass("clicked");
            $("#result").val(now_result + dateText.dateFormat('　・m月d日'));
            var WeekCharsJa = ["（日）", "（月）", "（火）", "（水）", "（木）", "（金）", "（土）"];
            var WeekCharsEn = ["  - Sun, ", "  - Mon, ", "  - Tue, ", "  - Wed, ", "  - Thu, ", "  - Fri, ", "  - Sat, "];
            var wDay = dateText.getDay();
            // $("#result").val(now_result + WeekCharsJa[wDay] + dateText.dateFormat('F d'));
            var now_result = $("#result").val();
            $("#result").val(now_result + WeekCharsJa[wDay]);
            onSelectTimeFlag = false;
            onSelectDateFlag = true;
        },
        onSelectTime: function(dateText) {
            var now_result = $("#result").val();
            $(".copy_btn").removeClass("clicked");
            if (onSelectTimeFlag) {
                $("#result").val(now_result + dateText.dateFormat('H:i') + "\n");
                onSelectTimeFlag = false;
                onSelectDateFlag = false;
            } else {
                $("#result").val(now_result + dateText.dateFormat('H:i～'));
                onSelectTimeFlag = true;
            }
        },
    });

    $('.full').click(function() {
        var now_result = $("#result").val();
        if (onSelectDateFlag) {
            $("#result").val(now_result + '\n');
        }
        onSelectTimeFlag = false;
        onSelectDateFlag = false;
        // var now_str = $("#result").val();
        // $("#result").val(now_str.replace(/,\s{2}/g, '\n') + '');
    })

    $('.copy_btn').click(function() {
        var copyText = document.querySelector('#result');
        var range = document.createRange();
        range.selectNode(copyText);
        getSelection().removeAllRanges();
        getSelection().addRange(range);
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copy command was ' + msg);
            //alert('コピーしました');
            $(this).addClass("clicked");
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        // 選択状態を解除する
        window.getSelection().removeAllRanges();
    });


    $('.reset_btn').click(function() {
        $("#result").val("");
        $(".copy_btn").removeClass("clicked");
    });
});