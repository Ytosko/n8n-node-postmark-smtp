
import { PostmarkSmtp } from '../nodes/PostmarkSmtp/PostmarkSmtp.node';

describe('PostmarkSmtp Node', () => {
    it('should be defined', () => {
        const node = new PostmarkSmtp();
        expect(node).toBeDefined();
        expect(node.description.displayName).toBe('Postmark SMTP by Ytosko');
        expect(node.description.name).toBe('postmarkSmtp');
        expect(node.description.credentials).toHaveLength(1);
    });
});
