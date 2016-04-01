<?php

return [
	'table' => 'oauth_identities',
	'providers' => [
		'facebook' => [
			'client_id' => '',
			'client_secret' => '',
			'redirect_uri' => '',
			'scope' => ['email','public_profile'],
		],
		'linkedin' => [
			'client_id' => '',
			'client_secret' => '',
			'redirect_uri' => '',
			'scope' => [],
		],
	],
];
