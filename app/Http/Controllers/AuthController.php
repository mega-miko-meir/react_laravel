<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Cookie;
use App\Http\Requests\UpdateInfoRequest;
use Laravel\Sanctum\PersonalAccessToken;
use App\Http\Requests\UpdatePasswordRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Response as FacadesResponse;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){

        $user = User::create(
            [
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role_id' => 1
            ]

        );

        $loginRequest = new Request([
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ]);

        return $this->login($loginRequest);


        // return response(new UserResource($user->load('role')), Response::HTTP_CREATED);
    }

    public function login(Request $request){
        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json(['error' => 'invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        /** @var User $user */
        $user = Auth::user();

        $minutes = 40;

        $expiresAt = Carbon::now()->addMinutes($minutes);

        $jwt = $user->createToken('token', ['*'], $expiresAt)->plainTextToken;

        $cookie = cookie('jwt', $jwt, $minutes);

        return response(['user' => $user, 'token' => $jwt])->withCookie($cookie);

    }

    public function logout(){
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'success'
        ])->withCookie($cookie);
    }


    public function user(Request $request)
    {
        return new UserResource($request->user()->load('role'));
    }


    public function updateInfo(UpdateInfoRequest $request){
        $user = $request->user();

        $user->update($request->only('first_name', 'last_name', 'email'));

        return response($user, Response::HTTP_ACCEPTED);
    }


    public function updatePassword(UpdatePasswordRequest $request){
        $user = $request->user();

        $user->update([
            'password' => Hash::make($request->input('password'))
        ]);

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

}

