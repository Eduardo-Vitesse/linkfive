'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/login','SessionController.store')

Route.get('/users', 'UserController.index').middleware(['auth'])
Route.get('/user/:id', 'UserController.show')
Route.post('/create_user', 'UserController.store')
Route.patch('/atualizar/:id', 'UserController.update').middleware(['auth'])
Route.delete('/del_user/:id', 'UserController.destroy').middleware(['auth'])

Route.get('/links/:id', 'LinkController.index')
//Route.get('/link/:id', 'LinkController.show').middleware(['auth'])
Route.post('/create_link', 'LinkController.store').middleware(['auth'])
Route.patch('/atualizar_link/:id', 'LinkController.update').middleware(['auth'])
Route.delete('/del_link/:id', 'LinkController.destroy').middleware(['auth'])
