<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DeviceController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('hello', fn() => 'Hello, World!');

Route::post('signup', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('user', [AuthController::class, 'user']);
    Route::apiResource('roles', RoleController::class);

    Route::post('logout', [AuthController::class, 'logout']);

    Route::put('users/info', [AuthController::class, 'updateInfo']);
    Route::put('users/password', [AuthController::class, 'updatePassword']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('devices', DeviceController::class);

    Route::post('upload', [ImageController::class, 'upload']);

    Route::apiResource('orders', OrderController::class)->only('index', 'show');

    Route::get('chart', [OrderController::class, 'chart']);
});
