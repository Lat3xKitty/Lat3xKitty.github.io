
$(function() {
    setupQuestions();
})

function setupEvents() {

    $('li.question')
    .off('click')
    .on('click', function () {
        // don't move if is open //
        if ($(this).next().hasClass("openedFaQ")) {
            $(this).removeClass('openedQuestion');
            $(this).next().slideUp().removeClass("openedFaQ");
        }
        else {
            // plus, minus effect //
            $('li.question').removeClass('openedQuestion');
            $(this).addClass('openedQuestion');
            // remove anything already open //
            $('li.answer').slideUp().removeClass("openedFaQ");
            // add open state to the correct item //
            $(this).next().slideToggle(500).addClass('openedFaQ').siblings('li.answer').slideUp();
        }
    });

    // On load open the very first answer instance //
    $( "ul.faq:first li.answer:first" ).css("display", "block" ).addClass("openedFaQ");
    $( "ul.faq:first li.question:first" ).addClass("openedQuestion");
}

function setupQuestions() {
    var $content = $('.content');
    $content.empty();

    $.ajax({
        type: "GET",
        url: "./faq.json",
        dataType: "JSON",
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                const questionCategory = response[i];

                $content.append(
                    $('<h2>').text(questionCategory.categoryName)
                );

                var $categoryList = $('<ul>').addClass('faq')
                for (let j = 0; j < questionCategory.categoryQuestions.length; j++) {
                    const question = questionCategory.categoryQuestions[j];

                    $categoryList.append(
                        $('<li>')
                            .addClass('question')
                            .data(question.tags)
                            .append(
                                $('<h4>')
                                    .append('<span>')
                                    .append(document.createTextNode(
                                        question.question
                                    ))
                            )
                            .append(
                                $('<div>')
                                    .addClass('fq_icon')
                                    .append('<span>')
                                    .append('<span>')
                            )
                    );
                    $categoryList.append(
                        $('<li>')
                            .addClass('answer')
                            .text(
                                question.answer
                            )
                    );
                }

                $content.append($categoryList)
            }

            setupEvents();
        }
    });

    setupEvents();
}