Decoders.controller 'DecodersCtrl', ($scope, $location, $timeout) ->
  possible_symbols = [
    'fa-camera-retro'
    'fa-anchor'
    'fa-bell-o'
    'fa-asterisk'
    'fa-cloud'
    'fa-cutlery'
    'fa-envelope'
    'fa-fighter-jet'
    'fa-flash'
    'fa-glass'
    'fa-headphones'
    'fa-bug'
    'fa-cogs'
    'fa-fire'
    'fa-heart'
    'fa-lock'
    'fa-magic'
    'fa-money'
    'fa-magnet'
    'fa-music'
    'fa-plus-circle'
    'fa-picture-o'
    'fa-smile-o'
  ]
  _.extend $scope,
    phrase: $location.search().phrase or ""
    symbols:[]
    encoders:[]
    delta_symbols: 0
    hint: ""
    print: false
    doPrint: () ->
      $scope.print = true
      $timeout window.print

  $scope.$watch 'phrase', () -> updateSymbols()
  $scope.$watch 'delta_symbols', () -> updateSymbols()
  updateSymbols = () ->
    $location.search {phrase: $scope.phrase}
    cleaned_phrase = _.filter _.uniq($scope.phrase), (c) -> c != " "
    altered_phrase = cleaned_phrase
    $scope.hint = ''
    if $scope.delta_symbols > 0
      $scope.hint = "Hmm...  We seem to have " + $scope.delta_symbols + " extra codes!"
      while altered_phrase.length < cleaned_phrase.length+$scope.delta_symbols
        altered_phrase.push(
                            String.fromCharCode(97 + Math.round(Math.random() * 25)))
        altered_phrase = _.uniq(altered_phrase)
    random_symbols = _.shuffle possible_symbols

    $scope.symbols = _.shuffle(
                       _.map altered_phrase, (l) ->
                         {icon: random_symbols.shift(), letter: l}
                       )
    $scope.encoders = _.map $scope.phrase, (l) ->
                        _.find $scope.symbols, (s) -> s.letter == l

    if $scope.delta_symbols < 0
      $scope.hint = "Oh no!  We're missing " + (0-$scope.delta_symbols) + " codes!"
      $scope.symbols = $scope.symbols.slice(0,
                          $scope.symbols.length+$scope.delta_symbols)

  this
