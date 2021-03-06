// Generated by CoffeeScript 1.6.3
(function() {
  Decoders.controller('DecodersCtrl', function($scope, $location, $timeout) {
    var possible_symbols, updateSymbols;
    possible_symbols = ['fa-camera-retro', 'fa-anchor', 'fa-bell-o', 'fa-asterisk', 'fa-cloud', 'fa-cutlery', 'fa-envelope', 'fa-fighter-jet', 'fa-flash', 'fa-glass', 'fa-headphones', 'fa-bug', 'fa-cogs', 'fa-fire', 'fa-heart', 'fa-lock', 'fa-magic', 'fa-money', 'fa-magnet', 'fa-music', 'fa-plus-circle', 'fa-picture-o', 'fa-smile-o'];
    _.extend($scope, {
      phrase: $location.search().phrase || "",
      symbols: [],
      words: [],
      delta_symbols: 0,
      hint: "",
      print: false,
      doPrint: function() {
        $scope.print = true;
        return $timeout(window.print);
      }
    });
    $scope.$watch('phrase', function() {
      return updateSymbols();
    });
    $scope.$watch('delta_symbols', function() {
      return updateSymbols();
    });
    updateSymbols = function() {
      var altered_phrase, cleaned_phrase, l, random_symbols, word, _i, _len, _ref;
      $location.search({
        phrase: $scope.phrase
      });
      cleaned_phrase = _.filter(_.uniq($scope.phrase), function(c) {
        return c !== " ";
      });
      altered_phrase = cleaned_phrase;
      $scope.hint = '';
      if ($scope.delta_symbols > 0) {
        $scope.hint = "Hmm...  We seem to have " + $scope.delta_symbols + " extra codes!";
        while (altered_phrase.length < cleaned_phrase.length + $scope.delta_symbols) {
          altered_phrase.push(String.fromCharCode(97 + Math.round(Math.random() * 25)));
          altered_phrase = _.uniq(altered_phrase);
        }
      }
      random_symbols = _.shuffle(possible_symbols);
      $scope.symbols = _.shuffle(_.map(altered_phrase, function(l) {
        return {
          icon: random_symbols.shift(),
          letter: l
        };
      }));
      $scope.words = [];
      word = [];
      _ref = $scope.phrase;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        l = _ref[_i];
        if (l === ' ') {
          $scope.words.push(word);
          word = [];
        } else {
          word.push(_.find($scope.symbols, function(s) {
            return s.letter === l;
          }));
        }
      }
      $scope.words.push(word);
      if ($scope.delta_symbols < 0) {
        $scope.hint = "Oh no!  We're missing " + (0 - $scope.delta_symbols) + " codes!";
        return $scope.symbols = $scope.symbols.slice(0, $scope.symbols.length + $scope.delta_symbols);
      }
    };
    return this;
  });

}).call(this);
