<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class Product extends Model implements AuthenticatableContract, CanResetPasswordContract {

    use Authenticatable,
        CanResetPassword;

    protected $table = "products";
    protected $fillable = [];

    public function getProductList($cat_id) {
        $ProductData = Product::select('products.*')
                ->where('status', 1)
                ->where('cat_id', $cat_id)
                ->get();
        return $ProductData;
    }

    public function getProductListForAdmin() {
        $ProductData = Product::select('products.*')
                ->get();
        return $ProductData;
    }

    public function getProductListById($id) {
        $ProductData = Product::select('products.*')
                ->where('id', $id)
                ->get();
        return $ProductData;
    }

    public function getProductById($id) {
        $ProductData = Product::select('products.*')
                ->where('id', $id)
                ->first();
        return $ProductData;
    }

    public function getShippingCostById($id) {
        $ProductData = Product::select('products.shippingCost')
                ->where('id', $id)
                ->first();
        return $ProductData;
    }

}
