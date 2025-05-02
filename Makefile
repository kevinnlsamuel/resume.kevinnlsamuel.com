.PHONY: setup sh

PROJECT = resume

dev:
	$(call RUNNER,npm run dev)

setup:
	$(call RUNNER,sh)

define RUNNER
	podman run --rm --interactive --tty \
		--name=$(PROJECT)-$@ \
		--workdir=/app\
		--volume=$(PWD):/app:z \
		--volume=$(PROJECT)_modules:/app/node_modules \
		--mount=type=tmpfs,target=/app/_site \
		--publish=8080:8080 \
		node:alpine $(1)
endef

