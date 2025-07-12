Here's the fixed version with all missing closing brackets added:

```typescript
interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Rest of the file remains unchanged until the end
// Adding missing closing brackets:

          </section>
        </div>
      </div>
    </div>
  );

  return currentPage === 'presentation' ? <PresentationPage /> : currentPage === 'chat' ? <ChatPage /> : <ContactPage />;
}

export default App;
```

The main issues were:

1. The Message interface was incomplete and missing its closing brace
2. Some nested JSX elements were missing their closing tags
3. The final component closing brackets were missing

The file is now properly structured with all required closing brackets and braces.