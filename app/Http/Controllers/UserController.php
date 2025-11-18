<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\Gate;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function index()
    {
        // Gate::authorize('view', 'users');

        return UserResource::collection(User::with('role')->paginate(100));
    }

    public function store(UserCreateRequest $request)
    {
        $user = User::create($request->only('first_name', 'last_name', 'email')
        +[
            'password' => Hash::make(1234),
            'role_id' => 1
        ]);

        return response($user, Response::HTTP_CREATED);
    }

    public function show(string $id)
    {
        return new UserResource(User::with('role')->find($id));
    }

    public function update(UserUpdateRequest $request, string $id)
    {
        $user = User::find($id);

        $user->update($request->only('first_name', 'last_name', 'email', 'password'));

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function destroy(string $id)
    {
        User::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
