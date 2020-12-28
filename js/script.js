$('#submit').click(function() {
    var amount = $('#amount').val();
    var competition = $('#competition').val();

    if (!isNumeric(amount) || amount < 100) {
        return;
    }

    if (!isNumeric(competition) || competition == 0) {
        return;
    }

    $('.my-game').remove();
    $('#empty').css('display', 'none');
    $('#submit').text('Submiting...');
    $('#submit').css('cursor', 'not-allowed');
    $('#submit').css('color', '#222');
    $('#submit').prop('disabled', true);
    $.ajax('https://bet-odds.herokuapp.com/riskless?competition_id='+competition + '&amount=' + amount, {
    type: 'GET',  success: function(result) {
        $('#submit').text('Submit');
        $('#submit').css('cursor', 'pointer');
        $('#submit').prop('disabled', false);
        $('#submit').css('color', '#fff');
        if (result.success) {
            var gamesWithProfit = result.data.result.won;

            if (gamesWithProfit.length == 0) {
                $('#empty').css('display', 'block');
            } else {
                gamesWithProfit.forEach(function(game) {
                    var $html = '<table class="uk-table uk-table-divider uk-table-middle uk-table-justify my-game">';
                    $html +='<h3 class="my-game"><b>' + game.match + '</b></h3>';
                    $html +='<thead>' + '<tr>';
                    $html += '<th>Odd</th>' + '<th class="uk-text-success">Platform</th>' + '<th class="uk-text-emphasis">Outcome</th>';
                    $html += '<th class="uk-text-emphasis">Amount To Play</th>' + '<th class="uk-text-emphasis">Potential Win</th>';
                    $html += '</tr></thead><tbody>';

                    $html += '<tr>' + '<td>' + game.win.oddValue + '</td>';
                    $html += '<td>' + (game.win.platform == 'xbet' ? '1xbet' : game.win.platform ) + '</td><td>1 (Home)</td>';
                    $html += '<td><b><a href=' + '"' + getUrl(game.win.platform, result.data.urls) + '"' + '>' + formatMoney(game.eval.amount_to_play[0]) + '</a></b></td>' 
                    $html += '<td><b>' + formatMoney(game.eval.amount_to_win[0]) + '</b></td><tr>';

                    $html += '<tr>' + '<td>' + game.draw.oddValue + '</td>';
                    $html += '<td>' + (game.draw.platform == 'xbet' ? '1xbet' : game.draw.platform ) + '</td><td>X (Draw)</td>';
                    $html += '<td><b><a href=' + '"' + getUrl(game.draw.platform, result.data.urls) + '"' + '>' + formatMoney(game.eval.amount_to_play[1]) + '</a></b></td>';
                    $html += '<td><b>' + formatMoney(game.eval.amount_to_win[1]) + '</b></td><tr>';

                    $html += '<tr>' + '<td>' + game.lost.oddValue + '</td>';
                    $html += '<td>' + (game.lost.platform == 'xbet' ? '1xbet' : game.lost.platform )+ '</td><td>2 (Away)</td>';
                    $html += '<td><b><a href=' + '"' + getUrl(game.lost.platform, result.data.urls) + '"' + '>' + formatMoney(game.eval.amount_to_play[2]) + '</a></b></td>';
                    $html += '<td><b>' + formatMoney(game.eval.amount_to_win[2]) + '</b></td><tr>';

                    $html +='</tbody></table>';
                    $('#t-wrapper').append($html);
                });
            }

        }
        console.log(result);
   }});
});

function getUrl(platform, urls) {
    return urls[platform];
}
function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }