<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class Property extends Model implements AuthenticatableContract {

    use Authenticatable;

    protected $table = 'Property';
    protected $fillable = ['property_type', 'location', 'last_name', 'business_deal', 'price', 'area', 'no_of_bedrooms', 'status', 'description', 'development_id'];
    //
    protected $casts = [
        'image' => 'array',
    ];

    public function getPropertyList() {
        $PropertyData = Property::select('property.*')
                        //->where('users.status',1)
                        ->orderBy('property.id', 'desc')->get();
        return $PropertyData;
    }
public function getDeleteImage($image) {
        $PropertyData = Property::select('property.image')->first();
                       
        return $PropertyData;
    }
}
