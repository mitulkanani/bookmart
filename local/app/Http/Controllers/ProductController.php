<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\BookMart;
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
use Image;
use File;
use App\UploadImage;
use Response;
use Illuminate\Support\Facades\Route;
use Cookie;
use Session;
use Gloudemans\Shoppingcart\Facades\Cart;
use App\CartProduct;
use App\Category;

class ProductController extends Controller {

    public function __construct() {
        $this->userOBJ = new User();
        $this->cartproductOBJ = new CartProduct();
        $this->bookmartOBJ = new BookMart();
        $this->CategoryOBJ = new Category();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function view_product() {
        return view('front/product/ajax_product_view');
    }

    public function viewProductDetails($id) {
        return view('front/product/productview');
    }

    public function addsuccess(Request $request) {
        $product_id = Request::get('id_product');
        
        if ($product_id != null || 0) {
            if (Request::isMethod('post')) {
                $product = $this->cartproductOBJ->getProductListById($product_id);
                Cart::add(array(
                    'id' => $product[0]->id,
                    'name' => e($product[0]->name),
                    'quantity' => 1,
                    'image' => e($product[0]->image_cart),
                    'image_cart' => e($product[0]->image_cart),
                    'price' => e($product[0]->price),
                    'options' => array(
                        'price_float' => e($product[0]->price),
                        'full_name' => e($product[0]->full_name),
                    ),
                        )
                );
            }
        }
        $delete = Request::get('delete');
        if ($delete != null || 0) {
            $rowId = Request::get('rowid');
            Cart::remove($rowId);
        }
        $cart = Cart::content();
        $totalCartprice = Cart::total(); //Price total
        $totalcount = Cart::count(); // Get the number of items in the cart
//        $shippingCost = Cart::getshippingcost($product_id); // Get shipping coast
//        $totalQtyprice = Cart::getTotal($product_id); //get totalof perticular items
        $product_value = array();
        foreach ($cart as $key => $value) {
            $product_value[] = $value;
        }
//        dd($totalCartprice);
        $product_r = array(
            'products' => $product_value,
            "discounts" => [],
            'shippingCost' => '0',
            'shippingCostFloat' => '0',
            'nbTotalProducts' => $totalcount,
            'total' => $totalCartprice,
            'productTotal' => $totalCartprice,
            "freeShipping" => "0.00",
            'freeShippingFloat' => 0,
            'free_ship' => false,
            'isVirtualCart' => false,
            'hasError' => false,
        );
        $products_json = json_encode($product_r);

        return $products_json;
    }

    function viewPage() {
        $cat_id = Request::get('cat_id');
        return view('front/all_product_page');
    }

}
