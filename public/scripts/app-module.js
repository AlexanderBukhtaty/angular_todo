'use strict'

var app = angular.module('todos', []);

var data = {
    tags: {
        1: '#низкий приоритет',
        2: '#средний приоритет',
        3: '#высокий приоритет',
        4: '#АЛЯРМ!!!'
    },
    todos: [
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
    ]
};

/****Контроллеры****/
app.controller('todoCtrl', ['$scope','$http',function($scope,$http) {
    //Инициализация массива задач
    $http.get('api/v0/todos/items').success(function (data,status,headers,config) {
        console.log('something went wrong!');
        $scope.todoList = data.items;
    }).error(function () {
        console.log('something went wrong! when load todo-data');
    });
    $scope.todoGet = function() {
    };
    //Функция добавления задачи
    $scope.todoAdd = function() {
        console.log('todoAdd');
        //$scope.todoList.push({todoText:$scope.todoForm, done:false});
        //$scope.todoInput = '';
    };
    //Функция удаления задачи
    $scope.todoRemove = function() {
        console.log('todoRemove');
        //var oldList = $scope.todoList;
        //$scope.todoList = [];
        //angular.forEach(oldList, function(x) {
        //    if (!x.done) $scope.todoList.push(x);
        //});
    };
    //Функция открывающая модальное окно задачи
    $scope.openTodoModal = function (){
        $('#todo-update-modal').modal('show');
    }
    //Функция открывающая модальное окно подтверждения действия
}]);

//**** Фильры ****//
/* Фильтр соотношения номера тега и класса(css)
 * Применяется для того что бы классифицировать каждую лэйбу отдельным классом(цветом)
 */
app.filter('badgeColor', function() {
    return function(input, optional1, optional2) {
        var output;
        switch (input){
            case 1:
                output = 'badge-primary';break;
            case 2:
                output = 'badge-success';break;
            case 3:
                output = 'badge-info';break;
            case 4:
                output = 'badge-warning';break;
            case 5:
                output = 'badge-danger';break;
            default: output = 'badge-default';
        }
        return output;
    }

});