'use strict'

var app = angular.module('todos', []);

/**** Сервисы ****/
/* Сервис для работы с задачами
 * */
app.service('todosSrvc',['$http',function ($http) {
    var data = {
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
    this.save=function (currentTask) {
        console.log('todos.save');
        currentTask.id = data.todos.length;
        data.todos.push(currentTask);
    };
    this.remove=function (id) {
        console.log('todos.remove');
        data.todos.shift(id);
    };
}]);
/* Сервис для работы с тегами задач
 * */
app.service('tagsSrvc',[function () {
    //Возможно надо дописать функцию приводящую значения с сервиса в вид ниже
    /*
     tags: [
     {id:'1',label:'Низкий приоритет'},
     {id:'2',label:'Средний приоритет'},
     {id:'3',label:'Высокий приоритет'},
     {id:'4',label:'АЛЯРМ!!!'}
     ]
     */
    var data = {
        tags:{
            1: '#низкий приоритет',
            2: '#средний приоритет',
            3: '#высокий приоритет',
            4: '#АЛЯРМ!!!'
        }
    };
    this.get=function () {
        console.log('tags.get');
        return data.tags;
    };
}]);

/****Контроллеры****/
//TODO нужно забандить изменения массивов что бы не вызывать геттеры каждый раз
app.controller('todoCtrl', ['$scope','$http','todosSrvc','tagsSrvc',function($scope,$http,todosSrvc,tagsSrvc) {
    $scope.todoList = todosSrvc.get();
    $scope.tagsList = tagsSrvc.get();
    $scope.currentTask={id: 1, tag: 2, content: 'challenge#1'};
    $scope.todoClick = function(){

    };
    //Функция добавления задачи
    $scope.todoAddClick = function() {
        todosSrvc.save($scope.currentTask);
        $scope.currentTask = {id: 1, tag: 2, content: 'challenge#1'};
        $scope.todoList = todosSrvc.get();
        $scope.$apply();
    };
    //Функция удаления задачи
    $scope.todoRemoveClick = function() {
        todosSrvc.remove(id);
        $scope.todoList = todosSrvc.get();
    };
    //Работа с модальным окном
    $scope.modalShown = false;
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };
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
/*Модальные окна*/
app.directive('modal',function(){
    return {
        restrict: 'E',
        replace: false,
        transclude: false,
        /*scope: {
            title:'@modalTitle',
            contentTemplateUlr:'@modalContentTemplateUrl'
        },*/
        templateUrl: 'templates/modal/task-form.html'
    }
});

