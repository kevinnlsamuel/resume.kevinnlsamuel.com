.PHONY: setup sh

PROJECT = resume

setup:
	podman run --interactive --tty \
		--workdir=/app\
		--volume=$(PWD):/app:z \
		--volume=$(PROJECT)_modules:/app/node_modules \
		--mount=type=tmpfs,target=/app/_site \
		node:alpine sh

