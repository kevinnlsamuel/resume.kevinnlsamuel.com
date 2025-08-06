.PHONY: dev build setup sh

PROJECT = resume

dev: NODE_ENV=development
dev: development.env
	$(call RUNNER,npm run dev)

build: NODE_ENV=production
build: production.env
	$(call RUNNER,npm run build)

setup:
	$(call RUNNER,sh)

sh:
	podman exec --interactive --tty $(PROJECT)-dev sh

%.env:
	touch $@

define RUNNER
	podman run --rm --interactive --tty \
		--name=$(PROJECT)-$@ \
		--workdir=/app\
		--env-file=$(NODE_ENV).env \
		--env=NODE_ENV=$(NODE_ENV) \
		--volume=$(PWD):/app:z \
		--volume=$(PROJECT)_modules:/app/node_modules \
		--mount=type=tmpfs,target=/app/_site \
		--publish=8080:8080 \
		node:alpine $(1)
endef

