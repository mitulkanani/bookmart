<?php

use Mockery as M;
use SocialNorm\GitHub\GitHubProvider;
use SocialNorm\Request;

use GuzzleHttp\Client as HttpClient;
use GuzzleHttp\Subscriber\Mock as SubscriberMock;

class GitHubProviderTest extends TestCase
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
            __DIR__ . '/_fixtures/github_accesstoken.txt',
            __DIR__ . '/_fixtures/github_user.txt',
            __DIR__ . '/_fixtures/github_email.txt',
        ]);

        $provider = new GitHubProvider([
            'client_id' => 'abcdefgh',
            'client_secret' => '12345678',
            'redirect_uri' => 'http://example.com/login',
        ], $client, new Request(['code' => 'abc123']));

        $user = $provider->getUser();

        $this->assertEquals('4323180', $user->id);
        $this->assertEquals('adamwathan', $user->nickname);
        $this->assertEquals('Adam Wathan', $user->full_name);
        $this->assertEquals('adam@example.com', $user->email);
        $this->assertEquals('https://avatars.githubusercontent.com/u/4323180?v=3', $user->avatar);
        $this->assertEquals('abcdefgh12345678', $user->access_token);
    }

    /**
     * @test
     * @expectedException SocialNorm\Exceptions\ApplicationRejectedException
     */
    public function it_fails_to_retrieve_a_user_when_the_authorization_code_is_omitted()
    {
        $client = $this->getStubbedHttpClient([
            __DIR__ . '/_fixtures/github_accesstoken.txt',
            __DIR__ . '/_fixtures/github_user.txt',
            __DIR__ . '/_fixtures/github_email.txt',
        ]);

        $provider = new GitHubProvider([
            'client_id' => 'abcdefgh',
            'client_secret' => '12345678',
            'redirect_uri' => 'http://example.com/login',
        ], $client, new Request([]));

        $user = $provider->getUser();
    }
}
