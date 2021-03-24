<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $faker = Faker::create();
        foreach (range(1, 20) as $index) {
            $post = new Post();
            $post->title = $faker->word;
            $post->body = $faker->paragraph;
            $post->photo = 'Laptop.jpg';
            $post->save();
        }
    }
}
