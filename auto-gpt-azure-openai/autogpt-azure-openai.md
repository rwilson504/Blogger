![Step-by-Step to Success: Run AutoGPT using Azure OpenAI on Docker](https://github.com/rwilson504/Blogger/assets/7444929/105d93ce-4983-4c37-9fc2-bbf9dbc6be3e)

Integrating AutoGPT with Azure OpenAI through Docker offers a direct path to unlocking advanced AI capabilities. This detailed guide not only walks through the initial setup and configuration steps but also emphasizes the critical adjustments required for effective Azure OpenAI integration. Let's dive into a more focused and informative discussion on setting up AutoGPT and ensuring it works seamlessly with Azure OpenAI services.

## What is AutoGPT?

[AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) is like having a smart robot buddy that helps you achieve a specific goal by chatting with a super smart AI, kind of like having a conversation with a genius friend. Here’s how it works, broken down really simply:

1. **You Set a Goal**: Imagine you have a goal, like planning a surprise birthday party or learning about space. You tell this to your robot buddy.

2. **The Robot Starts the Chat**: Your robot buddy kicks things off by asking the first question to the genius AI, aiming to get information or ideas related to your goal.

3. **Listening and Thinking**: After getting an answer, the robot thinks about it, figures out if it's helpful, and what to ask next to get closer to your goal.

4. **Asking More Questions**: Based on what the genius AI says, the robot keeps the conversation going, asking more questions to dig deeper or get more specific information, all aimed at reaching your goal.

5. **Goal Achieved**: This back-and-forth chat continues until your robot buddy has gathered enough info or ideas to help you meet your goal, like having a full plan for that surprise party or a good understanding of space.

In short, AutoGPT is like a helpful middleman between you and a super-smart AI, doing all the talking and thinking for you, so you don't have to come up with what to ask next. It makes getting to your goal easier by handling the conversation, making sure everything stays on track.

## Detailed Configuration Steps for Integrating AutoGPT with Azure OpenAI

### Initial Setup

1. Install [Docker](https://www.docker.com/get-started/)
   
2. **Fork and Clone the AutoGPT Repository**: Begin by forking the [AutoGPT repository on GitHub](https://github.com/Significant-Gravitas/AutoGPT) and cloning it to your local machine, for instance, at `C:\Auto-GPT`.

### Configuration

2. **Environment Setup**:
   - Copy the `.env.template` file from `C:\Auto-GPT\autogpts\autogpt` to the primary folder `C:\Auto-GPT` and rename it to `.env`.
   - Edit the `.env` file, setting `USE_AZURE=True` to enable Azure OpenAI integration. Ensure `True` is capitalized to avoid issues.

3. **API Key Configuration**:
   - Update the `OPENAI_API_KEY` in the `.env` file with your Azure OpenAI API key, found in the Azure portal under your OpenAI service's "Keys and Endpoints".  

     ![image](https://github.com/rwilson504/Blogger/assets/7444929/2f3968ad-27cb-4266-9b91-07d116908595)


4. **Docker and Azure YAML Setup**:
   - Copy the `azure.yaml.template` file to `C:\Auto-GPT` rename it to `azure.yaml` we will adjust it later according to our Azure OpenAI service details.
   - Create a `docker.compose.yml` file in `C:\Auto-GPT` using the Docker setup template from the AutoGPT documentation. Add the following line to the volumes section to prevent the `app/azure.yaml` file not found error:

     Volume Sample:
     ```yaml
     volumes:
       - ./azure.yaml:/app/azure.yaml
     ```

     Entire docker-compose:
     ```yaml
      version: "3.9"
      services:
        auto-gpt:
          image: significantgravitas/auto-gpt
          env_file:
            - .env    
          ports:
            - "8000:8000"  # remove this if you just want to run a single agent in TTY mode
          profiles: ["exclude-from-up"]
          volumes:
            - ./data:/app/data
            ## allow auto-gpt to write logs to disk
            - ./logs:/app/logs
            ## allow auto-gpt to read the azure yaml file
            - ./azure.yaml:/app/azure.yaml
            ## uncomment following lines if you want to make use of these files
            ## you must have them existing in the same folder as this docker-compose.yml
            #- type: bind
            #  source: ./ai_settings.yaml
            #  target: /app/ai_settings.yaml
            #- type: bind
            #  source: ./prompt_settings.yaml
            #  target: /app/prompt_settings.yaml
     ```

     

### Azure AI Models Deployment

5. **Deploy Azure AI Models**:
   - Use [Azure AI Studio](https://oai.azure.com/portal) to deploy necessary models like `gpt-4` and `gpt-3.5-turbo-text-embedding-ada-002`, setting deployment names to match the model names for simplicity.  

     ![image](https://github.com/rwilson504/Blogger/assets/7444929/51e4ed6d-ffe3-4bc1-9acb-2fb43f47528b)

### Final Adjustments

6. **Modify the `azure.yaml` File**:
   - Set `azure_api_type` to `azure`, ensuring the use of the API key for authentication.  If you want to use Azure AD you can set the parameter to `azure_ad`.  This will also require that you use an auth token as your OPENAPI_API_KEY.  Instructions on how to obtain this token can be found in [How to Configure AutoGPT with Azure OpenAI Active Directory Managed Identity](https://gist.github.com/primaryobjects/523577860628974501ffd3c52cd73525). 
   - The `azure_api_base` and `azure_api_version` was determined using the [Azure AI Studio's](https://oai.azure.com/portal) chat playground "View code" feature.
     
     ![image](https://github.com/rwilson504/Blogger/assets/7444929/d5888573-532e-4f7e-880d-84280ec2e80c)
     
     ![image](https://github.com/rwilson504/Blogger/assets/7444929/770210c4-1aa1-4d57-8aa1-cb7b7de7a386)

   - For azure_model_map, an iterative approach was taken. Initially, no mappings were specified. After running the Docker command, errors indicating missing models were used to gradually populate this section with the correct model mappings. This process involved mapping the AutoGPT's expected model names to the corresponding deployment names in Azure AI Studio. 

     ![2024-02-28_16-36-06](https://github.com/rwilson504/Blogger/assets/7444929/41dc5ec2-a20f-4518-a815-4eb57beeeef0)

    Complete azure.yaml file.

     ```yaml
     azure_api_type: azure
     azure_api_base: https://rawopenai.openai.azure.com/
     azure_api_version: 2024-02-15-preview
     azure_model_map:
         gpt-3.5-turbo-16k: gpt-35-turbo
         gpt-4: gpt-4
         ext-embedding-3-small: text-embedding-ada-002
     ```

### Execution

7. **Running AutoGPT**:
   - Execute AutoGPT via Docker from the `C:\Auto-GPT` directory using the command `docker compose run --rm auto-gpt`. This step confirms the successful integration and functionality of AutoGPT with Azure OpenAI.

## Conclusion

AutoGPT revolutionizes our interaction with AI by automating the conversation process, guiding us toward achieving specific goals with minimal effort. This transformative approach streamlines tasks ranging from content creation to complex data analysis, making it a versatile tool for anyone looking to leverage AI's power. The simplicity of AutoGPT, coupled with its goal-oriented methodology, democratizes access to advanced AI capabilities, enabling users to focus on outcomes rather than getting bogged down in the technicalities of prompt engineering.

Through this article, we've provided a detailed blueprint for integrating AutoGPT with Azure OpenAI, ensuring you have the knowledge to harness this innovative technology effectively. Whether you're a seasoned developer or new to the world of AI, the step-by-step guide laid out here is designed to empower you to implement AutoGPT within the Azure ecosystem successfully. Embracing AutoGPT opens up a realm of possibilities, allowing you to push the boundaries of what you can achieve with AI, turning complex tasks into manageable, goal-driven projects.
