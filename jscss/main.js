var countTimeClick = 0;
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

    $('#dateTimePicker').dateTimePicker({
        formatTime: 'H:i',
        formatDate: 'd.m.Y',
        defaultTime: '8:30',
        inline: true,
        step: 30,
        lang: 'ja',
        timepickerScrollbar: false,
        onSelectDate: function(dateText) {
            var WeekCharsJa = ["（日）", "（月）", "（火）", "（水）", "（木）", "（金）", "（土）"];
            var WeekCharsEn = ["  - Sun. ", "  - Mon. ", "  - Tue. ", "  - Wed. ", "  - Thu. ", "  - Fri. ", "  - Sat, "];
            var now_result = $("#result").val();
            var wDay = dateText.getDay();
            $(".copy_btn").removeClass("clicked");
            countTimeClick = 0;
            if (toggle.checked) {
                $("#result").val(now_result + "\n" + WeekCharsEn[wDay] + dateText.dateFormat('F d'));
                now_result = $("#result").val();
            } else {
                $("#result").val(now_result + "\n" + dateText.dateFormat('　・m月d日'));
                now_result = $("#result").val();
                $("#result").val(now_result + WeekCharsJa[wDay]);
                now_result = $("#result").val();
            }
            onSelectTimeFlag = false;
            onSelectDateFlag = true;
        },

        onSelectTime: function(dateText) {
            countTimeClick += 1;
            console.log(`${countTimeClick}`);
            var now_result = $("#result").val();
            $(".copy_btn").removeClass("clicked");
            if (onSelectTimeFlag) {
                $("#result").val(now_result + dateText.dateFormat('H:i'));
                onSelectTimeFlag = false;
                onSelectDateFlag = false;
            } else {
                if (toggle.checked) {
                    $("#result").val(now_result + dateText.dateFormat(', H:i - '));
                } else {
                    $("#result").val(now_result + dateText.dateFormat('H:i～'));
                    if (countTimeClick % 2 == 1 && countTimeClick > 1) {
                        $("#result").val(now_result + "、" + dateText.dateFormat('H:i～'));
                    }
                }
                onSelectTimeFlag = true;
            }
        },
    });

    // Copyボタン クリック時
    $('.copy_btn').click(function() {
        var clipboardText = result.value.slice(1);
        try {
            var successful = navigator.clipboard.writeText(clipboardText);
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copy command was ' + msg);
            $(this).addClass("clicked");
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        // 選択状態を解除する
        window.getSelection().removeAllRanges();
    });

    // Resetボタン クリック時
    $('.reset_btn').click(function() {
        $("#result").val("");
        $(".copy_btn").removeClass("clicked");
    });
});

function buttonClick() {
    if (toggle.checked) {
        console.clear();
        console.log("English mode");
        // alert("English");
    }
}