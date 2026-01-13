@php
    // Definir configuración de campos
    $fieldConfig = [
        'name' => [
            'label' => 'Name',
            'type' => 'text',
            'placeholder' => 'Enter name',
            'required' => true
        ],
        'email' => [
            'label' => 'Email address',
            'type' => 'email',
            'placeholder' => 'Enter email',
            'required' => true,
            'helpText' => "We'll never share your email with anyone else."
        ],
        'message' => [
            'label' => 'Message',
            'type' => 'textarea',
            'placeholder' => 'Write your message here...',
            'rows' => 5,
            'required' => true,
            'className' => 'msg'
        ],
        'terms' => [
            'label' => 'Check me out',
            'type' => 'checkbox'
        ],
        'username' => [
            'label' => 'Name or email',
            'type' => 'text',
            'placeholder' => 'Enter you name or email',
            'required' => true
        ],
        'password' => [
            'label' => 'Password',
            'type' => 'password',
            'placeholder' => 'Enter password',
            'required' => true
        ]
    ];
@endphp

<div class="contact-form {{ $class ?? '' }}">
    @if(isset($title))
        <h1 class="text-center">{{ $title }}</h1>
    @endif

    <form method="POST" action="{{ $action ?? '#' }}">
        @csrf
        @foreach($fields as $fieldName)
            @php
                $field = $fieldConfig[$fieldName];
                $value = old($fieldName, $formData[$fieldName] ?? '');
                $error = $errors->first($fieldName);
            @endphp

            @if($field['type'] === 'checkbox')
                <div class="form-check my-2">
                    <input type="checkbox" 
                           class="form-check-input" 
                           id="{{ $fieldName }}" 
                           name="{{ $fieldName }}" 
                           {{ $value ? 'checked' : '' }}>
                    <label class="form-check-label" for="{{ $fieldName }}">
                        {{ $field['label'] }}
                    </label>
                </div>
            @else
                <div class="form-group my-2 {{ $field['className'] ?? '' }}">
                    <label class="{{ $field['required'] ? 'required-label' : '' }}" for="{{ $fieldName }}">
                        {{ $field['label'] }}
                    </label>

                    @if($field['type'] === 'textarea')
                        <textarea class="form-control @error($fieldName) is-invalid @enderror"
                                  id="{{ $fieldName }}"
                                  name="{{ $fieldName }}"
                                  rows="{{ $field['rows'] ?? 3 }}"
                                  placeholder="{{ $field['placeholder'] }}"
                                  {{ $field['required'] ? 'required' : '' }}>{{ $value }}</textarea>
                    @else
                        <input type="{{ $field['type'] }}"
                               class="form-control @error($fieldName) is-invalid @enderror"
                               id="{{ $fieldName }}"
                               name="{{ $fieldName }}"
                               placeholder="{{ $field['placeholder'] }}"
                               value="{{ $value }}"
                               {{ $field['required'] ? 'required' : '' }}
                               aria-describedby="{{ $fieldName }}Help">
                    @endif

                    @if(isset($field['helpText']))
                        <small id="{{ $fieldName }}Help" class="form-text text-muted">
                            {{ $field['helpText'] }}
                        </small>
                    @endif

                    @error($fieldName)
                        <small class="form-text text-danger">{{ $message }}</small>
                    @enderror
                </div>
            @endif
        @endforeach

        <div class="{{ isset($secondaryButton) ? 'regist' : '' }}">
            @if(isset($secondaryButton))
                <a href="{{ $secondaryButton['href'] }}" class="btn btn-secondary">
                    {{ $secondaryButton['text'] }}
                </a>
            @endif
            <button type="submit" class="btn btn-primary">
                {{ $submitText ?? 'Send' }}
            </button>
        </div>
    </form>
</div>