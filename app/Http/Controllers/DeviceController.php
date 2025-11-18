<?php

namespace App\Http\Controllers;

use App\Http\Resources\DeviceResource;
use App\Models\Device;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DeviceController extends Controller
{
    public function index()
    {
        return DeviceResource::collection(Device::paginate(10));

    }

    public function store(Request $request)
    {
        $device = Device::create($request->only('model', 'serial_number', 'invent_number', 'image', 'description'));

        return response(new DeviceResource($device), Response::HTTP_CREATED);
    }


    public function show(string $id)
    {
        return new DeviceResource(Device::find($id));
    }


    public function update(Request $request, string $id)
    {
        $device = Device::find($id);

        $device->update($request->only('model', 'serial_number', 'invent_number', 'image', 'description'));

        return response(new DeviceResource($device, Response::HTTP_ACCEPTED));
    }


    public function destroy(string $id)
    {
        Device::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
