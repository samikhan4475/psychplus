platform:
	docker build -f apps/platform/Dockerfile .

clinical:
	docker build -f apps/clinical/Dockerfile .

patient:
	docker build -f apps/clinical/Dockerfile .

revcycle:
	docker build -f apps/revcycle/Dockerfile .

docker: platform clinical patient revcycle
