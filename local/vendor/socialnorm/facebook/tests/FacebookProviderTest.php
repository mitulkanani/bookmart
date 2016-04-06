<?php

use Mockery as M;
use SocialNorm\Facebook\FacebookProvider;
use SocialNorm\Request;

use GuzzleHttp\Client as HttpClient;
use GuzzleHttp\Subscriber\Mock as SubscriberMock;

class FacebookProviderTest extends TestCase
{
    private function getStubbedHttpClient($responses = [])
    {
        $client = new HttpClient;
        $mockSubscriber = new SubscriberMock($responses);
        $client->getEmitter()->attach($mockSubscriber);
        return $client;
    }

    /** @test */
    public function it_can_retrieve_a_normalized_user()
    {
        $client = $this->getStubbedHttpClient([
            __DIR__ . '/_fixtures/facebook_accesstoken.txt',
            __DIR__ . '/_fixtures/facebook_user.txt',
        ]);

        $provider = new FacebookProvider([
            'client_id' => 'abcdefgh',
            'client_secret' => '12345678',
            'redirect_uri' => 'http://example.com/login',
        ], $client, new Request(['code' => 'abc123']));

        $user = $provider->getUser();

        $this->assertEquals('187903669', $user->id);
        $this->assertEquals('John Doe', $user->nickname);
        $this->assertEquals('John Doe', $user->full_name);
        $this->assertEquals('john@example.com', $user->email);
        $this->assertEquals('https://graph.facebook.com/v2.4/187903669/picture', $user->avatar);
        $this->assertEquals(
            'RUXRIAxWwxVYKk3b1vrTACPUiAGImrszVsBXb2FQZZZXbd6JNzkZRAgZLCdAiCfKHrPanMTS8BAHLPqugidBcCNkUmz3y72XMZRZWw4SEGdczB2HygsA7oQOufDIbgZBtyA1KaznugApacfId5HIdZtIEh47ZLEa0BrJrBICZBf4uCWCGD5OBM40RpvTVaAux2vCv5wU9ZZzm91WAVtSC5ufoZmr3Ty',
            $user->access_token
        );
    }

    /**
     * @test
     * @expectedException SocialNorm\Exceptions\ApplicationRejectedException
     */
    public function it_fails_to_retrieve_a_user_when_the_authorization_code_is_omitted()
    {
        $client = $this->getStubbedHttpClient([
            __DIR__ . '/_fixtures/facebook_accesstoken.txt',
            __DIR__ . '/_fixtures/facebook_user.txt',
        ]);

        $provider = new FacebookProvider([
            'client_id' => 'abcdefgh',
            'client_secret' => '12345678',
            'redirect_uri' => 'http://example.com/login',
        ], $client, new Request([]));

        $user = $provider->getUser();
    }
}
