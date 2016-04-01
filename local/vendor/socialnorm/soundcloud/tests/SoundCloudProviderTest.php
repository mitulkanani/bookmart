<?php

use Mockery as M;
use SocialNorm\SoundCloud\SoundCloudProvider;
use SocialNorm\Request;

use GuzzleHttp\Client as HttpClient;
use GuzzleHttp\Subscriber\Mock as SubscriberMock;

class SoundCloudProviderTest extends TestCase
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
            __DIR__ . '/_fixtures/soundcloud_accesstoken.txt',
            __DIR__ . '/_fixtures/soundcloud_user.txt',
        ]);

        $provider = new SoundCloudProvider([
            'client_id' => 'abcdefgh',
            'client_secret' => '12345678',
            'redirect_uri' => 'http://example.com/login',
        ], $client, new Request(['code' => 'abc123']));

        $user = $provider->getUser();

        $this->assertEquals('139564472', $user->id);
        $this->assertEquals('johndoe', $user->nickname);
        $this->assertEquals('John Doe', $user->full_name);
        $this->assertNull($user->email);
        $this->assertEquals('https://a1.sndcdn.com/images/default_avatar_large.png', $user->avatar);
        $this->assertEquals('1-837658-827364918-8276fd65a63b7', $user->access_token);
    }

    /**
     * @test
     * @expectedException SocialNorm\Exceptions\ApplicationRejectedException
     */
    public function it_fails_to_retrieve_a_user_when_the_authorization_code_is_omitted()
    {
        $client = $this->getStubbedHttpClient([
            __DIR__ . '/_fixtures/soundcloud_accesstoken.txt',
            __DIR__ . '/_fixtures/soundcloud_user.txt',
        ]);

        $provider = new SoundCloudProvider([
            'client_id' => 'abcdefgh',
            'client_secret' => '12345678',
            'redirect_uri' => 'http://example.com/login',
        ], $client, new Request([]));

        $user = $provider->getUser();
    }
}
