import { Accordion } from 'flowbite-react';
import { CircleHelp } from 'lucide-react';

type QuizDescriptionProps = {
    content: string;
    hint?: string;
};

const QuizDescription = ({ content, hint = '' }: QuizDescriptionProps) => {
    return (
        <div className='w-[45%] border rounded-lg border-gray-300 p-4'>
            <h2 className='font-semibold text-2xl text-Dark-Blue py-2'>문제</h2>
            <p className='font-medium text-lg text-gray-800 whitespace-pre-wrap'>{content}</p>
            {hint && (
                <Accordion className='rounded-none border-x-0 mt-5' collapseAll>
                    <Accordion.Panel className='rounded-none'>
                        <Accordion.Title className='focus:ring-0 p-3 first:rounded-none last:rounded-none'>
                            <span className='inline-flex items-center gap-1'>
                                <CircleHelp className='w-5 h-5' /> <span>Hint</span>
                            </span>
                        </Accordion.Title>
                        <Accordion.Content className='p-3 first:rounded-none last:rounded-none'>
                            <div
                                className='text-gray-500 dark:text-gray-400'
                                dangerouslySetInnerHTML={{ __html: hint }}
                            />
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            )}
        </div>
    );
};

export default QuizDescription;
