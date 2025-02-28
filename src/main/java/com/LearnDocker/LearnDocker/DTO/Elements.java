package com.LearnDocker.LearnDocker.DTO;

import lombok.Getter;

public class Elements {
    @Getter
    private Image[] images;
    @Getter
    private Container[] containers;

    public Elements(Image[] images, Container[] containers) {
        this.images = images;
        this.containers = containers;
    }

    public static class Image {
        @Getter
        private String id;
        @Getter
        private String name;

        public Image(String id, String name) {
            this.id = id;
            this.name = name;
        }
    }

    public static class Container {
        @Getter
        private String id;
        @Getter
        private String name;
        @Getter
        private String status;
        @Getter
        private String image;

        public Container(String id, String name, String status, String image) {
            this.id = id;
            this.name = name;
            this.status = status;
            this.image = image;
        }

    }
}

