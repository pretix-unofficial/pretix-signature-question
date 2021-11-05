$(function () {
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }


    $(".questions-form .form-group").each(function () {
        // this is a dirty hack, a proper solution will likely become easier in future pretix versions
        if (!$(this).find("label").text().toLowerCase().includes("signature") || !$(this).find("input[type=file]").length) {
            return;
        }
        var $input = $(this).find("input[type=file]");
        $input.hide();

        var $signature = $("<div>")
        $input.closest("div").append($signature);
        $signature.jSignature('init', {
            'width': $(".questions-form .col-md-9").width()
        });

        var $reset = $("<button>").attr("type", "button").attr("class", "btn btn-default")
            .text(gettext("Reset")).on("click", function () {
                $signature.jSignature("clear");
            });
        $reset.insertAfter($signature);

        $signature.bind("change", function (e) {
            var data = $signature.jSignature("getData");
            var blob = dataURLtoBlob(data)
            var file = new File([blob], 'signature.png', {type: "image/png", lastModified: new Date()});

            var container = new DataTransfer();
            container.items.add(file)
            $input.get(0).files = container.files;
        })
    });
})
