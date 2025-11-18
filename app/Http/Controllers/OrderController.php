<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderItemResource;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    public function index(){
        $orders = Order::with('orderItems')->paginate();
        return OrderResource::collection($orders);
    }

    public function show($id){
        $order = Order::with('orderItems')->find($id);
        return new OrderResource($order);
    }

    public function chart(){
        // SELECT date_format(orders.created_at, '%Y-%m-%d') as date, sum(price*quantity) as sum
        // FROM orders
        // join order_items on orders.id = order_items.order_id
        // group by date
        // order by date;

        return Order::query()
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->selectRaw('date_format(orders.created_at, "%Y-%m-%d") as date, sum(price*quantity) as sum')
            ->groupBy('date')
            ->get()
            ;
    }
}
