package com.LearnDocker.LearnDocker;

import com.LearnDocker.LearnDocker.DTO.Elements;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Component
public class ObjectParser {

    private ObjectMapper objectMapper;

    public ObjectParser(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public Mono<String> portResponseParse(String response) {
        try {
            JsonNode json = this.objectMapper.readTree(response);
            String containerPort = json.get("NetworkSettings").get("Ports").get("2375/tcp").get(0).get("HostPort").asText();
            return Mono.just(containerPort);
        } catch (Exception e) {
            System.out.println("JSON 참조 틀림");
        }
        return Mono.just("");
    }

    // Todo: 아래 파싱 함수들 리팩토링 하기, 예외 처리
    public Elements.Image[] parseImages(String responseImages) {
        try {
            JsonNode rootArray = this.objectMapper.readTree(responseImages);
            List<Elements.Image> imageList = new ArrayList<>();
            for (JsonNode imageNode : rootArray) {
                String id = imageNode.get("Id").asText();
                String name = imageNode.get("RepoTags").get(0).asText().split(":")[0];
                imageList.add(new Elements.Image(id, name));
            }
            return imageList.toArray(new Elements.Image[0]);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Elements.Container[] parseContainers(String responseContainers) {
        try {
            JsonNode rootArray = this.objectMapper.readTree(responseContainers);
            List<Elements.Container> containerList = new ArrayList<>();
            for (JsonNode containerNode : rootArray) {
                String id = containerNode.get("Id").asText();
                String name = containerNode.get("Names").get(0).asText().split("/")[1];
                String image = containerNode.get("Image").asText();
                String status = containerNode.get("State").asText();
                containerList.add(new Elements.Container(id, name, image, status));
            }
            return containerList.toArray(new Elements.Container[0]);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String parseCreationExecResponseBody(String creationExecResponseBody) {
        try {
            JsonNode json = this.objectMapper.readTree(creationExecResponseBody);
            return json.get("Id").asText();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
