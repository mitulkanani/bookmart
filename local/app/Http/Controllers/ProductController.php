<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\PostedAd;
use App\Country;
use App\Http\Requests\adminAddUserRequest;
use App\Http\Requests\PostAdRequest;
use Illuminate\Support\Facades\Lang;
use Validator;
use Input;
use Redirect;
use Mail;
use Auth;
use Config;
use App\Property;
use Image;
use File;
use App\UploadImage;
use Response;
use Illuminate\Support\Facades\Route;
use Cookie;
use Session;
use Gloudemans\Shoppingcart\Facades\Cart;
use App\Product;

class ProductController extends Controller {

    public function __construct() {
        $this->userOBJ = new User();
        $this->productOBJ = new Product();
        $this->PostedAdOBJ = new PostedAd();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function addtocart() {
        $id = Input::get('product_id');
        Session::put('key', 'value');
        return response()->view('front/product/ajax_product')->withCookie(cookie('product_id[]', $id));
    }

    public function addsuccess(Request $request) {
        $product_id = Request::get('id_product');
        if ($product_id != null || 0) {
            if (Request::isMethod('post')) {
                $product = $this->productOBJ->getProductList($product_id);
                Cart::add(array(
                    'id' => $product[0]->id,
                    'name' => $product[0]->name,
                    'quantity' => 1,
                    'image' => $product[0]->image,
                    'price' => $product[0]->price
                        )
                );
            }
        }
        $cart = Cart::content();
        $totalCartprice = Cart::total(); //Price total
        $totalcount = Cart::count(); // Get the number of items in the cart
//        $totalQtyprice = Cart::getTotal($product_id); //get totalof perticular items
        $product_r = array();
        foreach ($cart as $key => $value) {
            $product_value[] = $value;
        }

        $product_r = array(
            'products' => $product_value,
            'total' => $totalCartprice,
            'nbTotalProducts' => $totalcount,
            'shippingCost' => 27,
            'shippingCostFloat' => 27,
            'productTotal' => 154,
            'freeShippingFloat' => 0,
            'free_ship' => false,
            'isVirtualCart' => false,
            'hasError' => false,
        );
        $products_json = json_encode($product_r);
//        dd($products_json);
        return $products_json;
    }

}
