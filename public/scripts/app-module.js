'use strict'

var app = angular.module('todos', []);

/**** Сервисы ****/
/* Сервис для работы с задачами
 * */
app.service('todosSrvc',['$http',function ($http) {
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
    this.get=function () {
        console.log('todos.get');
        /*
        $http.get('api/v0/todos/items').then(
            function successCallback(res) {
                //$scope.todoList = $scope.todoList.concat(res.data.items);
                if(!res.data.finish){
                 successCallback();
                 }
                console.log('successCallback: ' + JSON.stringify(res.data));
            },
            function errorCallback(res) {
                console.log('something went wrong! when load todo-data' + JSON.stringify(res));
            }
        );
        */
        return data.todos;
    };
    this.save=function () {
        console.log('todos.save');
        data.todos.push({id: data.todos.length, tag: 2, content: 'challenge#saved'});
    };
    this.remove=function (id) {
        console.log('todos.remove');
        data.todos.shift(id);
    };
}]);
/* Сервис для работы с тегами задач
 * */
app.service('tagsSrvc',[function () {
    this.get=function () {
        console.log('tags.get');
    };
}]);

/****Контроллеры****/
app.controller('todoCtrl', ['$scope','$http','todosSrvc','tagsSrvc',function($scope,$http,todosSrvc,tagsSrvc) {
    $scope.todoList = todosSrvc.get();
    console.log("sss");
    //Функция добавления задачи
    $scope.todoAddClick = function() {
        todosSrvc.save();
        $scope.todoList = todosSrvc.get();
    };
    //Функция удаления задачи
    $scope.todoRemoveClick = function() {
        todosSrvc.remove(id);
        $scope.todoList = todosSrvc.get();
    };
    //Функция открывающая модальное окно задачи
    $scope.openTodoModal = function (){
        $('#todo-update-modal').modal('show');
    }
    //Функция открывающая модальное окно подтверждения действия
    $scope.openVerifyActionModal = function (){
        $('#todo-update-modal').modal('show');
    }
}]);

/**** Фильтры ****/
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

/**** Директивы ****/
