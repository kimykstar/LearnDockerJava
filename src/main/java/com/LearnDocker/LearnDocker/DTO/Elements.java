package com.LearnDocker.LearnDocker.DTO;

public class Elements {
    private Image[] images;
    private Container[] containers;

    public Elements(Image[] images, Container[] containers) {
        this.images = images;
        this.containers = containers;
    }

    public static class Image {
        private String id;
        private String name;

        public Image(String id, String name) {
            this.id = id;
            this.name = name;
        }
    }

    public static class Container {
        private String id;
        private String name;
        private String status;
        private String image;

        public Container(String id, String name, String status, String image) {
            this.id = id;
            this.name = name;
            this.status = status;
            this.image = image;
        }

    }
}

