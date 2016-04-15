<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class CartProduct extends Model implements AuthenticatableContract, CanResetPasswordContract {

    use Authenticatable,
        CanResetPassword;

    protected $table = "cart_products";
    protected $fillable = ['full_name','name','sale_rent','front_big_img','back_big_img','price','discounts','shippingCost','description','status'];

    public function getProductList($cat_id) {
        $ProductData = CartProduct::select('cart_products.*')
                ->where('status', 1)
                ->where('cat_id', $cat_id)
                ->get();
        return $ProductData;
    }

    public function getProductListForAdmin() {
        $ProductData = CartProduct::select('cart_products.*')
                ->get();
        return $ProductData;
    }
    public function getcategoryListForAdmin() {
        $ProductData = Category::select('categories.*')
                ->get();
        return $ProductData;
    }

    public function getProductListById($id) {
        $ProductData = CartProduct::select('cart_products.*')
                ->where('id', $id)
                ->get();
        return $ProductData;
    }

    public function getProductById($id) {
        $ProductData = CartProduct::select('cart_products.*')
                ->where('id', $id)
                ->first();
        return $ProductData;
    }

    public function getShippingCostById($id) {
        $ProductData = CartProduct::select('cart_products.shippingCost')
                ->where('id', $id)
                ->first();
        return $ProductData;
    }

}
