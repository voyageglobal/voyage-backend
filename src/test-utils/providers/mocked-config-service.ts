import { Provider } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

export const MockedConfigService: Provider = {
  provide: ConfigService,
  useValue: {
    get: jest.fn().mockReturnValue({
      region: "region",
      accessKeyId: "accessKeyId",
      secretAccessKey: "secretAccessKey",
      userPoolId: "userPoolId",
      clientId: "clientId",
    }),
  },
}
