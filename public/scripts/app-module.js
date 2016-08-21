'use strict'
//angular.module('todos', []);

var todos= [
    {id: 1, tag: 2, content: 'challenge#1'},
    {id: 2, tag: 5, content: 'challenge#2'},
    {id: 3, tag: 2, content: 'challenge#3'},
    {id: 4, tag: 3, content: 'challenge#4'},
    {id: 5, tag: 1, content: 'challenge#5'},
    {id: 6, tag: 4, content: 'challenge#6'},
    {id: 7, tag: 1, content: 'challenge#7'},
    {id: 8, tag: 4, content: 'challenge#8'},
    {id: 9, tag: 3, content: 'challenge#9'},
    {id: 10, tag: 2, content: 'challenge#10'}
];

var app = angular.module('todos', []);

app.controller('todoCtrl', function($scope) {
    //Инициализация массива задач
    $scope.todoList = todos;
    $scope.todoInit = function() {
    };
    //Функция добавления задачи
    $scope.todoAdd = function() {
        $scope.todoList.push({todoText:$scope.todoForm, done:false});
        $scope.todoInput = "";
    };
    //Функция удаления задачи
    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.todoList.push(x);
        });
    };
    //Функция открывающая модальное окно задачи
    //Функция открывающая модальное окно подтверждения действия
});