up-docker:
	docker-compose up -d
build:
	docker-compose build --no-cache --force-rm
stop:
	docker-compose stop
restart:
	docker-compose restart
migrate:
	php artisan migrate
rollback:
	php artisan migrate:rollback
fresh:
	php artisan migrate:fresh
seeders:
	php artisan db:seed
up-laravel:
	php artisan serve
up-angular:
	ng serve