<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class Transport extends Model implements AuthenticatableContract, CanResetPasswordContract {

    use Authenticatable,
        CanResetPassword;

    protected $table = "transports";
    protected $fillable = ['ad_title', 'ad_type', 'cover_image', 'price', 'owner_name', 'mobileno', 'address', 'city', 'desc', 'status'];

    public function getTransportList() {
        $AddData = Transport::select('transports.*')
                ->where('status', 1)
                ->get();
        return $AddData;
    }
    public function getTransportForadminList() {
        $AddData = Transport::select('transports.*')
                ->get();
        return $AddData;
    }
}
