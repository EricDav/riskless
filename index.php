<?php
    $subPath = $_SERVER['HTTP_HOST'] == 'localhost:8888' ? '/riskless' : '';

    $competitions = array(
        1 => 'ENG Premier League',
        2 => 'Laliga',
        3 => 'Bundesliga',
        4 => 'Ligue 1',
        6 => 'Seria A',
        9 => 'Champions League',
        11 => 'Europa League',
        12 => 'ENG Championship',
        8 => 'Eredivisie'
    );
?>


<html>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        <link rel="stylesheet" href="<?=$subPath .  '/css/style.css'?>">
    </head>
    <style>
      td {
        text-transform: capitalize;
      }
      #empty {
          text-align: center;
          display: none;
      }
    </style>
    <body>
        <nav class="uk-navbar-container uk-margin uk-navbar" data-uk-navbar="true">
            <div class="uk-navbar-center">
                <div class="uk-navbar-center-left">
                    <div>
                        <ul class="uk-navbar-nav">
                            <li class="uk-active"><a href="#">Home</a></li>
                        </ul>
                    </div>
                </div>
                <a class="uk-navbar-item uk-logo uk-text-primary" href="#"><span>💰</span>RISKLESS<span>💰</span></a>
                <div class="uk-navbar-center-right">
                    <div>
                        <ul class="uk-navbar-nav">
                            <li><a href="#">Results</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <div class="uk-section uk-section-muted">
            <div id="t-wrapper" class="uk-container">
               
                  <table class="uk-table uk-table-divider uk-table-middle uk-table-justify">
                     <thead>
                        <tr>
                           <th>Supported Betting Platforms</th>
                           <th class="uk-text-success">COMPETITIONS</th>
                           <th class="uk-text-emphasis">AMOUNT TO INVEST</th>
                           <!-- <th class="uk-text-danger">LOOSE OODS</th> -->
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>
                              <a style="color: #e41827;" href="https://www.sportybet.com/" _target="blank"><span class="platform-title"><b>SportyBet |</b></span></a>
                              <a style="color: #1c813d;"  href="https://www.bet9ja.com/"><span class="platform-title"><b>Bet9ja |</b></span></a>
                              <a style="color: #062064;"  href="https://www.betking.com/"><span class="platform-title"><b>Betking |</b></span></a>
                              <a style="color: rgb(1, 59, 229);"  href="https://www.nairabet.com/"><span class="platform-title"><b>Nairabet |</b></span></a>
                              <a style="color: #2073b0;"  href="https://www.1xbet.com/"><span class="platform-title"><b>1xbet</b></span></a>
                           </td>
                           <td>
                               <select id="competition" type="text" class="uk-input">
                                   <option value="0">-- Select Competition --</option>
                                   <?php foreach($competitions as $competionId => $competition ): ?>
                                    <option value="<?=$competionId?>"><?=$competition?></option>
                                   <?php endforeach; ?>
                                <select>
                            </td>
                           <td><input id="amount" type="text" class="uk-input" placeholder="0"></td>
                        </tr>
                     </tbody>
                  </table>
                  <button id="submit" type="button" class="uk-button uk-button-secondary uk-width-1-1 uk-margin-small-bottom">Submit</button>
                  <h4 id="empty">No available fixture with profit. Try another time or anther competition.</h4>
            </div>
         </div>
         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
        <script src="<?=$subPath .  '/js/script.js?v=2'?>"></script>
    </body>
</html>